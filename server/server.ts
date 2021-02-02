import { TwitterURL } from './config/url.enum';
const http = require('http');
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const needle = require('needle');
const config = require('dotenv').config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const rulesURL = TwitterURL.rules;
const streamURL = TwitterURL.stream;
const rules = [{value: 'giveaway'}];

async function getRules(): Promise<any> {
  const response = await needle('get', rulesURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.body;
}

async function setRules(): Promise<any> {
  const data = {
    add: rules,
  };

  const response = await needle('post', rulesURL, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
}

async function deleteRules({ data }) {
  if (!Array.isArray(data)) {
    return null;
  }

  const ids = data.map(ruleItem => ruleItem.id);

  const config = {
    delete: {
      ids,
    },
  };

  const response = await needle('post', rulesURL, config, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
}

async function initUpRules(): Promise<any> {
  let currentRules;
  try {
    currentRules = await getRules();
    await deleteRules(currentRules);
    await setRules();
    return currentRules;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function emitTweets(socket: { emit: (arg0: string, arg1: any) => void }): any {
  const stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  stream.on('data', (data: string) => {
    try {
      const json = JSON.parse(data);
      socket.emit('tweet', json);
    } catch (error) {
      console.error(error);
    }
  });

  return stream;
}

function initSocketConnection(): void {
  io.on('connection', async () => {
    console.log('Socket connected');

    await initUpRules();

    const trackStream = emitTweets(io);

    let timeout = 0;
    trackStream.on('timeout', () => {
      console.warn('A connection error occurred. Reconnecting…');
      setTimeout(() => {
        timeout++;
        emitTweets(io);
      }, 2 ** timeout);
      emitTweets(io);
    });
  });
}

initSocketConnection();
server.listen(3000, () => console.log(`Listening on port ${3000} for Twitter API with SocketIO`));
