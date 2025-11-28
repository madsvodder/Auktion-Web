import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {User} from '../../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../services/login-service';
import {LoginResponse} from '../../interfaces/login-response';

@Component({
  selector: 'app-login-page',
    imports: [
        ReactiveFormsModule,
    ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private router = inject(Router);

  constructor(private http: HttpClient, public loginService: LoginService) {}

  fb = inject(NonNullableFormBuilder)

  // Form
  form = this.fb.group({
    username: this.fb.control(''),
    password: this.fb.control(''),
  })

  tryLogin() {
    let loginUser: User = {
      email: this.form.value.username ?? '',
      password: this.form.value.password ?? ''
    }

    this.loginService.onLogin(loginUser).subscribe({

      next: (res) => {
        console.log(res)
        localStorage.setItem('role', res.role);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('username', res.username);
        this.router.navigate(['/']).then(r => console.log("logged in"));
      },
        error: (err) => {
        console.log('Login failed:', err);
        alert('Forkert email eller adgangskode.');
      }
    })
  }
}
