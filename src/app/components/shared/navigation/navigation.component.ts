import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/booking.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <h2>Delivery Management System</h2>
        </div>
        <div class="navbar-welcome" *ngIf="currentUser">
          <span>Welcome, {{ currentUser.name }}</span>
        </div>
        <div class="navbar-menu">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">Home</a>
          <a routerLink="/tracking" routerLinkActive="active" class="nav-link">Tracking</a>
          <a routerLink="/delivery-status" routerLinkActive="active" class="nav-link">Delivery Status</a>
          <a routerLink="/pickup-scheduling" routerLinkActive="active" class="nav-link">Pickup Scheduling</a>
          <a routerLink="/bookings" routerLinkActive="active" class="nav-link">View All Bookings</a>
          <a routerLink="/booking-service" routerLinkActive="active" class="nav-link">New Booking</a>
          <button class="btn btn-secondary" (click)="logout()">Logout</button>
        </div>
        <div class="navbar-mobile-toggle" (click)="toggleMobileMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-mobile" [class.open]="mobileMenuOpen">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link" (click)="closeMobileMenu()">Home</a>
        <a routerLink="/tracking" routerLinkActive="active" class="nav-link" (click)="closeMobileMenu()">Tracking</a>
        <a routerLink="/delivery-status" routerLinkActive="active" class="nav-link" (click)="closeMobileMenu()">Delivery Status</a>
        <a routerLink="/pickup-scheduling" routerLinkActive="active" class="nav-link" (click)="closeMobileMenu()">Pickup Scheduling</a>
        <a routerLink="/bookings" routerLinkActive="active" class="nav-link" (click)="closeMobileMenu()">View All Bookings</a>
        <a routerLink="/booking-service" routerLinkActive="active" class="nav-link" (click)="closeMobileMenu()">New Booking</a>
        <button class="btn btn-secondary" (click)="logout()">Logout</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .navbar .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
    }
    
    .navbar-brand h2 {
      color: #4a90e2;
      margin: 0;
      font-size: 1.5rem;
    }
    
    .navbar-welcome {
      font-weight: 500;
      color: #374151;
    }
    
    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    
    .nav-link {
      font-weight: 500;
      color: #6b7280;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover,
    .nav-link.active {
      color: #4a90e2;
      background: #f0f7ff;
    }
    
    .navbar-mobile-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 4px;
    }
    
    .navbar-mobile-toggle span {
      width: 24px;
      height: 3px;
      background: #374151;
      transition: all 0.3s ease;
    }
    
    .navbar-mobile {
      display: none;
      flex-direction: column;
      gap: 8px;
      padding: 16px 20px;
      background: white;
      border-top: 1px solid #e5e7eb;
    }
    
    .navbar-mobile.open {
      display: flex;
    }
    
    @media (max-width: 768px) {
      .navbar-menu {
        display: none;
      }
      
      .navbar-mobile-toggle {
        display: flex;
      }
      
      .navbar-welcome {
        font-size: 14px;
      }
      
      .navbar-brand h2 {
        font-size: 1.2rem;
      }
    }
    
    @media (max-width: 480px) {
      .navbar .container {
        padding: 12px 16px;
      }
      
      .navbar-brand h2 {
        font-size: 1rem;
      }
      
      .navbar-welcome {
        display: none;
      }
    }
  `]
})
export class NavigationComponent implements OnInit {
  currentUser: User | null = null;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}