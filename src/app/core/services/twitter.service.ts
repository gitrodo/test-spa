import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  constructor(
    private httpClient: HttpClient,
    private socket: Socket) { }

  public getTweets(): any {
    // debugger;
    const socket = io();
    socket.on('connect', () => {
      console.log('Connected to server...')
    });
    socket.on('tweet', (tweet: { data: { id: any; text: any; }; includes: { users: { username: any; }[]; }; }) => {
      const tweetData = {
        id: tweet.data.id,
        text: tweet.data.text,
        username: `@${tweet.includes.users[0].username}`,
      }
      console.log(tweetData);
    });

    // return this.httpClient.get<any>('api/streamTweets', {});
  }

  findTweets(): Observable<any> {
    const result = this.httpClient.get('api/getTweets');
    return result;
  }
}

