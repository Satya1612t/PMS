import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Initialize with sample admin user
    const sampleAdmin: User = {
      userId: 'ADM001',
      name: 'Officer John Smith',
      address: '123 Admin Street, Delhi',
      contactDetails: '+91 9876543210',
      role: 'officer'
    };
    this.currentUserSubject.next(sampleAdmin);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  login(user: User): void {
    this.currentUserSubject.next(user);
  }
}