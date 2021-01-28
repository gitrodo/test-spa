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
  private onDestroy$ = new Subject<boolean>();

  ngOnInit() {
    this.getPost();
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
        console.log('DATA: ', tweet);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }
}
