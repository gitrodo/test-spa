import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isSignedInSelector } from '../@store/selectors/auth.selector';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(isSignedInSelector),
            tap(signedIn => {
              if (!signedIn) {
                  this.router.navigateByUrl('/sign-in');
              }
            })
        );
    }
}
