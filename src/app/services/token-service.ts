import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public httpClient = Inject(HttpClient);
  public router: Router = Inject(Router);

  public checkToken() {
    const loginToken = localStorage.getItem('token');
    if (loginToken) {
      let decodedToken = jwtDecode(loginToken);
      const isExpired: boolean = decodedToken && decodedToken.exp
        ? decodedToken.exp < Date.now() / 1000
        : false;

      if (isExpired) {
        console.log("Token expired!")
        this.httpClient.post('http://localhost:5264/refresh', loginToken).subscribe({
          next: (res: string) => {

            // Set the new token!
            localStorage.setItem('token', res);

          },
          error: () => {

            // Log
            console.log("Token refresh failed!");

            // Clear local storage
            localStorage.clear()

            // Go to the login page
            this.router.navigate(['/login']).then(r => console.log("Navigated to login page"));
          },
        })
      } else {
        console.log("Token not expired!")
      }
    }
  }

}
