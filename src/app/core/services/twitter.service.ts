import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  constructor(
    private socket: Socket) { }

  public getTweets(): Observable<any> {
    return this.socket.fromEvent('tweet');
  }
}
