import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

// For save typing selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isSignedInSelector = createSelector(
    selectAuthState,
    auth => !!auth.user
);

export const isSignedOutSelector = createSelector(
    isSignedInSelector,
    signedIn => !signedIn
);
