import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import * as moment from 'moment';
import { LoginResponse } from 'src/app/interfaces/data.interface';
import { NotificationService } from 'src/app/core/services/notification.service';
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { of, EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
    }

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage,
        private notificationService: NotificationService
    ) {
    }

    login(email: string, password: string): Observable<LoginResponse> {
        const loginData = JSON.stringify({ 'email': email, 'password': password })
        return this.http.post<LoginResponse>(
            'http://localhost:5000/signin',
            loginData,
            this.httpOptions
        )
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): User | null {
        // TODO: Enable after implementation
        const user = this.localStorage.getItem('currentUser');
        if (user != null) {
            return JSON.parse(user) as User;
        }
        else {
            return null;
        }
    }

    passwordResetRequest(email: string) {
        return of(true).pipe(delay(1000));
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).pipe(delay(1000));
    }
}


