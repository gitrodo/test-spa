import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  constructor(
    private readonly httpClient: HttpClient,
    private socket: Socket
  ) { }

  public getTweets(): Observable<any> {
    return this.socket.fromEvent('tweet');
  }
}
