import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError, timer } from 'rxjs';
import { catchError, delayWhen, retryWhen, takeUntil } from 'rxjs/operators';
import { TwitterService } from 'src/app/core/services/twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private twitterService: TwitterService) { }
  public tweets = [];
  public tweetsAverage = 0;
  public minuteCounter = new Date();
  private onDestroy$ = new Subject<boolean>();
  ngOnInit() {
    this.getPost();
    this.getMinute();
  }

  public getPost(): void {
    this.twitterService.getTweets()
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(5000))
        )),
        takeUntil(this.onDestroy$)
      )
      .subscribe(tweet => {
        // const tweetData = {
        //   id: tweet.data.id,
        //   text: tweet.data.text,
        //   username: `@${tweet.includes.users[0].username}`,
        // }
        this.tweets.push(tweet);
      });
  }

  public getMinute(): boolean {
    let counter = 0;
    let tweetsLength = 0;
    setInterval(() => {
      counter++;
      if (counter === 60) {
        counter = 0;
        this.tweetsAverage = this.tweets.length - tweetsLength;
        tweetsLength = this.tweets.length;
        return true;
      }
    }, 1000);
    return false;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }
}
