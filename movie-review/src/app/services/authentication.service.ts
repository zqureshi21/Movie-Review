import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {shareReplay} from "rxjs/operators";
import * as moment from "moment";

const AUTH_API = 'http://localhost:3000/users/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      username,
      password
    }, httpOptions).pipe(shareReplay());
  }

  getExpiration(){
    const expiration = localStorage.getItem("expires_at")
    const expiresAt = JSON.parse(expiration || '{}');
    return moment(expiresAt)
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOUt(){
    return !this.isLoggedIn();
  }
}
