import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TwitterService } from 'src/app/core/services/twitter.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let twitterService: TwitterService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SocketIoModule.forRoot(config),
      ],
      providers: [
        TwitterService
      ]
    })
      .compileComponents()
      .then(() => {
        twitterService = TestBed.inject(TwitterService);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  });

  it('Should create the home component', () => {
    expect(component).toBeTruthy();
    console.log(component);
  });

  it('Should display the average number', () => {
    fixture.detectChanges();
    const average = el.queryAll(By.css('.average'));
    expect(average).toBeTruthy('Could not display Average info');
  });
});
