import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { noop } from 'rxjs/internal/util/noop';
import { catchError, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { login } from '../@store/actions/auth.actions';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginStatus: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.setForm();
  }

  private setForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('test@domain.com', Validators.required),
      password: new FormControl('qwerty123', Validators.required)
    });
  }

  public login(userForm: User): void {
    this.authService.signIn(userForm)
      .pipe(
        catchError(err => {
          this.loginStatus = true;
          return throwError(err);
        }),
        tap(user => {
          // Dispatch the info to the actions
          this.store.dispatch(login({ user: user.email }));
          this.router.navigateByUrl('/home');
        })
      )
      .subscribe(
        noop,
        () => this.loginStatus = false
      );
  }
}
