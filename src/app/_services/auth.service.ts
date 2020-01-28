// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// rxjs
import { tap, shareReplay, take } from 'rxjs/operators';
// jwt
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
// app
import { Login } from 'src/app/_models/login.model';
import { JWTPayload } from 'src/app/_models/jwtpayload.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
}

@Injectable()
export class AuthService {   
    apiRoot = 'http://localhost:4726/api/login/';
    formData: Login;

    constructor(private http: HttpClient) {
      
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
   

    login(form: FormGroup) {        
        console.log(form.value)  ;          
        return this.http.post(this.apiRoot, form.value, httpOptions).pipe(
            tap(response => this.setSession(response)),
            shareReplay(),
          );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
     
    }

    refreshToken() {
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
            return this.http.post(
                this.apiRoot.concat('refresh-token/'),
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


    nomeFocus() {
        var input = document.getElementsByName("username")[0];
        input.focus();
    }
}