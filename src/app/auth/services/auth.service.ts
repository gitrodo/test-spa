import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    user = {
        email: 'test@domain.com',
        password: 'qwerty123'
    };

    public signIn(userForm: User): Observable<User> {
        const validateUser = this.validateUser(userForm);

        if (validateUser) {
            const userToReturn = of(userForm);
            return userToReturn;
        } else {
            return undefined;
        }
    }

    private validateUser(userForm: User): boolean {
        return (userForm.email === this.user.email && userForm.password === this.user.password) ? true : false;
    }
}

