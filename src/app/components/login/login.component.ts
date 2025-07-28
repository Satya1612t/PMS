import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-illustration">
          <div class="illustration-content">
            <div class="truck-animation"></div>
            <div class="packages-animation"></div>
            <h2>Welcome Back to Logist</h2>
            <p>Access your logistics dashboard and manage your cargo solutions efficiently.</p>
          </div>
        </div>
        
        <div class="login-form-section">
          <div class="login-form-wrapper">
            <div class="login-header">
              <h1>Sign In</h1>
              <p>Enter your credentials to access your account</p>
            </div>
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email"
                  class="form-control"
                  [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                  placeholder="Enter your email"
                >
                <div class="error-message" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                  <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="password">Password</label>
                <div class="password-input">
                  <input 
                    [type]="showPassword ? 'text' : 'password'" 
                    id="password" 
                    formControlName="password"
                    class="form-control"
                    [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                    placeholder="Enter your password"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    (click)="togglePassword()"
                  >
                    {{ showPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
                <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                  <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
                  <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
                </div>
              </div>
              
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="rememberMe">
                  <span class="checkmark"></span>
                  Remember me
                </label>
                <a href="#" class="forgot-password">Forgot Password?</a>
              </div>
              
              <button type="submit" class="login-btn" [disabled]="loginForm.invalid || isLoading">
                <span *ngIf="!isLoading">Sign In</span>
                <span *ngIf="isLoading" class="loading-spinner"></span>
              </button>
              
              <div class="login-divider">
                <span>or</span>
              </div>
              
              <div class="alternative-logins">
                <button type="button" class="admin-login-btn" routerLink="/admin-login">
                  Admin Login
                </button>
              </div>
              
              <div class="signup-link">
                Don't have an account? 
                <a routerLink="/register">Create Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <a routerLink="/" class="back-home">← Back to Home</a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Login form submitted:', this.loginForm.value);
        // Handle successful login here
      }, 2000);
    }
  }
}