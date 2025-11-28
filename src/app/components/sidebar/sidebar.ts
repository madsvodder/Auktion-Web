import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ApiService} from '../../services/api-service';
import {LoginService} from '../../services/login-service';

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
}
