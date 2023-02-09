import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environment/evironment';

interface Response {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url = environment.API_URL

  constructor(private http: HttpClient) { }

  me() {
    return this.http.get<User>(`${this.url}/users/me`)
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.url}/users/`)
  }

  getUserByID(id: number) {
    return this.http.get<User>(`${this.url}/users/${id}`)
  }

  update(username: string, email: string, id: number) {
    return this.http.put<Response>(`${this.url}/users/${id}`, {username: username, email: email})
  }

  delete(id: number) {
    return this.http.delete<Response>(`${this.url}/users/${id}`)
  }
}
