import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="admin-login-container">
      <div class="admin-login-wrapper">
        <div class="admin-illustration">
          <div class="illustration-content">
            <div class="admin-icon"></div>
            <h2>Admin Portal</h2>
            <p>Secure access for logistics administrators to manage operations and monitor system performance.</p>
            <div class="security-features">
              <div class="feature">🔐 Multi-factor Authentication</div>
              <div class="feature">📊 Real-time Analytics</div>
              <div class="feature">⚡ Advanced Controls</div>
            </div>
          </div>
        </div>
        
        <div class="admin-form-section">
          <div class="admin-form-wrapper">
            <div class="admin-header">
              <div class="admin-badge">ADMIN</div>
              <h1>Administrator Login</h1>
              <p>Enter your administrative credentials</p>
            </div>
            
            <form [formGroup]="adminForm" (ngSubmit)="onSubmit()" class="admin-form">
              <div class="form-group">
                <label for="adminId">Admin ID</label>
                <input 
                  type="text" 
                  id="adminId" 
                  formControlName="adminId"
                  class="form-control"
                  [class.error]="adminForm.get('adminId')?.invalid && adminForm.get('adminId')?.touched"
                  placeholder="Enter admin ID"
                >
                <div class="error-message" *ngIf="adminForm.get('adminId')?.invalid && adminForm.get('adminId')?.touched">
                  <span *ngIf="adminForm.get('adminId')?.errors?.['required']">Admin ID is required</span>
                  <span *ngIf="adminForm.get('adminId')?.errors?.['minlength']">Admin ID must be at least 4 characters</span>
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
                    [class.error]="adminForm.get('password')?.invalid && adminForm.get('password')?.touched"
                    placeholder="Enter admin password"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    (click)="togglePassword()"
                  >
                    {{ showPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
                <div class="error-message" *ngIf="adminForm.get('password')?.invalid && adminForm.get('password')?.touched">
                  <span *ngIf="adminForm.get('password')?.errors?.['required']">Password is required</span>
                  <span *ngIf="adminForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="securityCode">Security Code</label>
                <input 
                  type="text" 
                  id="securityCode" 
                  formControlName="securityCode"
                  class="form-control"
                  [class.error]="adminForm.get('securityCode')?.invalid && adminForm.get('securityCode')?.touched"
                  placeholder="Enter 6-digit security code"
                  maxlength="6"
                >
                <div class="error-message" *ngIf="adminForm.get('securityCode')?.invalid && adminForm.get('securityCode')?.touched">
                  <span *ngIf="adminForm.get('securityCode')?.errors?.['required']">Security code is required</span>
                  <span *ngIf="adminForm.get('securityCode')?.errors?.['pattern']">Please enter a valid 6-digit code</span>
                </div>
              </div>
              
              <div class="form-options">
                <div class="session-settings">
                  <label class="radio-label">
                    <input type="radio" formControlName="sessionType" value="normal">
                    <span class="radio-mark"></span>
                    Normal Session (8 hours)
                  </label>
                  <label class="radio-label">
                    <input type="radio" formControlName="sessionType" value="extended">
                    <span class="radio-mark"></span>
                    Extended Session (24 hours)
                  </label>
                </div>
              </div>
              
              <button type="submit" class="admin-login-btn" [disabled]="adminForm.invalid || isLoading">
                <span *ngIf="!isLoading">
                  <span class="btn-icon">🔐</span>
                  Secure Login
                </span>
                <span *ngIf="isLoading" class="loading-spinner"></span>
              </button>
              
              <div class="security-notice">
                <div class="notice-icon">⚠️</div>
                <div class="notice-text">
                  <strong>Security Notice:</strong> All admin activities are logged and monitored. 
                  Unauthorized access attempts will be reported.
                </div>
              </div>
              
              <div class="back-to-user">
                <a routerLink="/login">← Back to User Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <a routerLink="/" class="back-home">← Back to Home</a>
    </div>
  `,
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.adminForm = this.formBuilder.group({
      adminId: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      securityCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      sessionType: ['normal', [Validators.required]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.isLoading = true;
      
      // Simulate API call with additional security checks
      setTimeout(() => {
        this.isLoading = false;
        console.log('Admin form submitted:', this.adminForm.value);
        // Handle successful admin login here
      }, 3000);
    }
  }
}