import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { Booking, User } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  currentUser: User | null = null;
  totalBookings = 0;
  activeDeliveries = 0;
  deliveredToday = 0;
  pendingPickups = 0;
  recentBookings: Booking[] = [];

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.bookingService.getAllBookings().subscribe(bookings => {
      this.totalBookings = bookings.length;
      this.activeDeliveries = bookings.filter(b => 
        ['booked', 'scheduled', 'pickedup', 'intransit'].includes(b.parcelStatus)
      ).length;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.deliveredToday = bookings.filter(b => 
        b.parcelStatus === 'delivered' && 
        b.dateOfBooking >= today
      ).length;
      
      this.pendingPickups = bookings.filter(b => 
        ['booked', 'scheduled'].includes(b.parcelStatus) && !b.pickupTime
      ).length;
      
      this.recentBookings = bookings
        .sort((a, b) => b.dateOfBooking.getTime() - a.dateOfBooking.getTime())
        .slice(0, 5);
    });
  }
}