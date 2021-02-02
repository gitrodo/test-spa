import {
  createReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../actions/action.types';


export interface AuthState {
  user: string;
}

export const intialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  intialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.signOut, (state, action) => {
    return {
      user: undefined
    };
  })
);
