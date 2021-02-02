import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, signOut } from 'src/app/auth/@store/actions/auth.actions';
import { isSignedInSelector, isSignedOutSelector } from 'src/app/auth/@store/selectors/auth.selector';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSignedIn$: Observable<boolean>;
  isSignedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.validateSigned();
  }

  public signOut(): void {
    this.store.dispatch(signOut());
  }

  public validateSigned(): void {

    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      // Gets the user in the store
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.isSignedIn$ = this.store
      .pipe(
        select(isSignedInSelector)
      );

    this.isSignedOut$ = this.store
      .pipe(
        select(isSignedOutSelector)
      );
  }
}
