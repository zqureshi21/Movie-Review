import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const moviesUrl = 'http://localhost:3000/dashboard/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any>{
    return this.http.get<any>(moviesUrl, httpOptions)
  }

  getUser(): Observable<any>{
    return this.http.get<any>(moviesUrl + '/user');
  }
}
