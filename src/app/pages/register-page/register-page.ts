import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  // Angular inject() best practice
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  // Form
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // UI state
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  // Getters til HTML
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onRegister() {

    if (!this.registerForm.valid) {
      console.log('Form is invalid');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const user = {
      email: this.email?.value,
      password: this.password?.value,
      role: 'user',
    };

    console.log('User to register:', user);

    this.loginService.register(user).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Bruger oprettet! Du omdirigeres til login siden...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Fejl ved oprettelse af bruger: Prøv igen';
        console.error(error);
      },
    });
  }

}
