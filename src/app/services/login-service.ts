import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import {LoginResponse} from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private LoginUrl: string = "http://localhost:5264/api/Auth/login"
  private RegisterUrl: string = "http://localhost:5264/api/User"

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(this.RegisterUrl, user)
  }

  onLogin(user: User){
    return this.http.post<LoginResponse>(this.LoginUrl, user)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId') ?? 0)
  }

  getUsername(): string {
    return localStorage.getItem('username') ?? ''
  }

  getLoginHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
}
