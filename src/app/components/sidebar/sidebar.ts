import {Component, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public loginService = inject(LoginService);
  private router = inject(Router);

  public logOut() {
    this.router.navigate(['/login']);
    // Clear local storage
    localStorage.clear()
  }
}
