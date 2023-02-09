import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/evironment';

interface Response {
  role: string,
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.API_URL;
  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
    this.user = this.userSubject.asObservable();
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.url}/users/register`, { username: username, email: email, password: password })
  }

  login(username: string, password: string) {
    return this.http.post<Response>(`${this.url}/users/login`, { username: username, password: password })
  }

  logout() {
    localStorage.clear();
    this.userSubject.next('');
    this.router.navigate(['login']);
  }
}
