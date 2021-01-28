import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { twitterConfig } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${twitterConfig.bearerToken}`,
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*',
                Mode: 'no-cors'
            }
        });
        return next.handle(req);
    }
}
