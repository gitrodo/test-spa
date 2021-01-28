import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/core/services/twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.getPost();
  }

  public getPost(): void {
    this.twitterService.getTweets()
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
