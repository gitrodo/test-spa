import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { filter, tap } from 'rxjs/operators';
import { AuthActions } from '../@store/actions/action.types';

@Injectable()
export class AuthEffects {

    // We subscribe automatically thanks to the createEffect funtion
    signIn$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action =>
                    localStorage.setItem('user', JSON.stringify(action.user))
                )
            ), { dispatch: false }); // Avoid infinitive loop

    signOut$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.signOut),
                tap(() => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('sign-in');
                })
            )
        , { dispatch: false });

    constructor(
        private actions$: Actions,
        private router: Router) { }
}
