import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {RefreshRequestDto} from '../dto/refresh-request-dto';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  public checkToken() {
    console.log("Checking token...");
    const loginToken = localStorage.getItem('token');

    let refDto: RefreshRequestDto = {
      token: loginToken ?? ""
    }

    console.log("REFREFREF: " + refDto.token);

    if (loginToken) {
      let decodedToken = jwtDecode(loginToken);
      const expiresSoon: boolean = decodedToken && decodedToken.exp
        ? decodedToken.exp - Date.now() / 1000 < 300 // 300 seconds
        : false;

      if (expiresSoon) {
        console.log("Token expired!")
        this.httpClient.post<RefreshRequestDto>('http://localhost:5264/api/Auth/refresh', refDto).subscribe({
          next: (res) => {

            // Set the new token!
            localStorage.setItem('token', res.token);

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
