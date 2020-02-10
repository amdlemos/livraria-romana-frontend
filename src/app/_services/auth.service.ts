// angular
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// rxjs
import { tap, shareReplay } from 'rxjs/operators';
// jwt
import * as jwtDecode from 'jwt-decode';
// app
import { JWTPayload } from 'src/app/_models/jwtpayload.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
// other
import * as moment from 'moment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
}

@Injectable()
export class AuthService {
    
    private readonly API = `${environment.API}login`;
    error$ = new Subject<boolean>();
    public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    private authenticated = false;

    constructor(
        private http: HttpClient,
        private router: Router) { }

    login(form: FormGroup) {
        console.log(form);
        return this.http.post(this.API, form, httpOptions).pipe(
            tap(response => {
                this.authenticated = true;
                this.showNavBar(true);
                this.setSession(response);
            }),
            shareReplay()
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        this.showNavBar(false);
        this.router.navigate(['login']);

    }

    refreshToken() {
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
            return this.http.post(
                this.API.concat('refresh-token/'),
                { token: this.token }
            ).pipe(
                tap(response => this.setSession(response)),
                shareReplay(),
            ).subscribe();
        }
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);

        return moment(expiresAt);
    }

    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    ifLoggedShowNavBar() {
        if (this.isLoggedIn)
            this.showNavBar(true);
    }

    private showNavBar(ifShow: boolean) {
        this.showNavBarEmitter.emit(ifShow);
    }

    private setSession(authResult) {
        const token = authResult.token;
        const payload = <JWTPayload>jwtDecode(token);
        const expiresAt = moment.unix(payload.exp);

        localStorage.setItem('token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    get token(): string {
        return localStorage.getItem('token');
    }
}