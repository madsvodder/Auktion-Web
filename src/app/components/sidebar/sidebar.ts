import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { filter } from 'rxjs';

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
