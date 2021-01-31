import { TestBed } from '@angular/core/testing';
import { TwitterService } from './twitter.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TWEETS } from '../../../../server/mocks/tweet.mock';
import MockedSocket from 'socket.io-mock';
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

describe('TwitterService', () => {
  let twitterService: TwitterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SocketIoModule.forRoot(config),
      ],
      providers: [
        TwitterService
      ]
    });

    twitterService = TestBed.inject(TwitterService);
  });

  it('should retreive all tweets', () => {
    // Subscribe to the observable
    const req$ = twitterService.getTweets()
    req$.subscribe(tweets => {
      expect(tweets).toBeTruthy('No tweets returned');
      expect(tweets.length).toBeGreaterThan(1);
    });


    //  Socked IO Mocked
    const socket = new MockedSocket();
    socket.on('tweet', (tweets: any) => {
      expect(tweets).toEqual(TWEETS);
    });
    socket.socketClient.emit('tweet', TWEETS);
    expect(req$).toBeTruthy('No results were found');
  });
});
