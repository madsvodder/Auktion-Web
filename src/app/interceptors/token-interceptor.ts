import {HttpClient, HttpInterceptorFn} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {Inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let httpClient = Inject(HttpClient);
  let router: Router = Inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    let decodedToken = jwtDecode(token);
    const isExpired: boolean = decodedToken && decodedToken.exp
      ? decodedToken.exp < Date.now() / 1000
      : false;

    if (isExpired) {
      console.log("Token expired!")
      httpClient.post('http://localhost:5264/refresh').subscribe({
        next: (res: string) => {

          // Set the new token!
          localStorage.setItem('token', res);

          // Go to the login page
          this.router.navigate(['/login']);
        },
        error: () => {},
      })
    } else {
      console.log("Token not expired!")
    }
  }

  return next(req);
};
