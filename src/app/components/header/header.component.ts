import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h2>Logist</h2>
          </div>
          
          <nav class="nav" [class.nav-open]="isMenuOpen">
            <a href="#" class="nav-link">Service</a>
            <a href="#" class="nav-link">Process</a>
            <a href="#" class="nav-link">Our Work</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Contact</a>
          </nav>
          
          <div class="header-actions">
            <button class="login-btn" routerLink="/login">Login</button>
            <button class="mobile-menu-btn" (click)="toggleMenu()">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}