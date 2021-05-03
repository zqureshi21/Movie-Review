import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  httpUrl = 'http://localhost:3000/movieDetails/'

  constructor(private http: HttpClient) { }

  getMovie(id: number): Observable<any>{
    return this.http.get<any>(`${this.httpUrl}movie/${id}`)
  }

  getComments(id: number): Observable<any>{
    return this.http.get<any>(`${this.httpUrl}comments/${id}`)
  }

  addComment(body: { movie: any; user: any; username: any; }, movie: any, user: any, username: any): Observable<any>{
    body.movie = movie;
    body.user = user;
    body.username = username;
    return this.http.post<any>(`${this.httpUrl}comments`,body)
  }

  editComment(body: any, id: any): Observable<any>{
    return this.http.put<any>(`${this.httpUrl}comments/${id}`,body)
  }

  deleteComment(id: any): Observable<any>{
    return this.http.delete<any>(`${this.httpUrl}${id}`)
  }
}
