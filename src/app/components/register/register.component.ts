import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-wrapper">
        <div class="register-illustration">
          <div class="illustration-content">
            <div class="warehouse-animation"></div>
            <div class="delivery-animation"></div>
            <h2>Join Logist Network</h2>
            <p>Create your account and start managing your logistics operations with ease.</p>
          </div>
        </div>
        
        <div class="register-form-section">
          <div class="register-form-wrapper">
            <div class="register-header">
              <h1>Create Account</h1>
              <p>Fill in your details to get started</p>
            </div>
            
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    formControlName="firstName"
                    class="form-control"
                    [class.error]="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched"
                    placeholder="Enter first name"
                  >
                  <div class="error-message" *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched">
                    First name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    formControlName="lastName"
                    class="form-control"
                    [class.error]="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched"
                    placeholder="Enter last name"
                  >
                  <div class="error-message" *ngIf="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched">
                    Last name is required
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email"
                  class="form-control"
                  [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                  placeholder="Enter your email"
                >
                <div class="error-message" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                  <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  formControlName="phone"
                  class="form-control"
                  [class.error]="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched"
                  placeholder="Enter phone number"
                >
                <div class="error-message" *ngIf="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched">
                  Phone number is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="company">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  formControlName="company"
                  class="form-control"
                  placeholder="Enter company name (optional)"
                >
              </div>
              
              <div class="form-group">
                <label for="password">Password</label>
                <div class="password-input">
                  <input 
                    [type]="showPassword ? 'text' : 'password'" 
                    id="password" 
                    formControlName="password"
                    class="form-control"
                    [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                    placeholder="Create password"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    (click)="togglePassword()"
                  >
                    {{ showPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
                <div class="error-message" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                  <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
                  <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <div class="password-input">
                  <input 
                    [type]="showConfirmPassword ? 'text' : 'password'" 
                    id="confirmPassword" 
                    formControlName="confirmPassword"
                    class="form-control"
                    [class.error]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched"
                    placeholder="Confirm password"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    (click)="toggleConfirmPassword()"
                  >
                    {{ showConfirmPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
                <div class="error-message" *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
                  <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
                  <span *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</span>
                </div>
              </div>
              
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="agreeToTerms" required>
                  <span class="checkmark"></span>
                  I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
                </label>
                
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="newsletter">
                  <span class="checkmark"></span>
                  Subscribe to newsletter for updates and offers
                </label>
              </div>
              
              <button type="submit" class="register-btn" [disabled]="registerForm.invalid || isLoading">
                <span *ngIf="!isLoading">Create Account</span>
                <span *ngIf="isLoading" class="loading-spinner"></span>
              </button>
              
              <div class="login-link">
                Already have an account? 
                <a routerLink="/login">Sign In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <a routerLink="/" class="back-home">← Back to Home</a>
    </div>
  `,
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      company: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]],
      newsletter: [false]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Register form submitted:', this.registerForm.value);
        // Handle successful registration here
      }, 2000);
    }
  }
}