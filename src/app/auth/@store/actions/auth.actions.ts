import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[SignIn Page] User SignIn',
    props<{ user: string }>()
);

export const signOut = createAction(
    '[Top Menu] SignOut'
);
