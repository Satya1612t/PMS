import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking, User } from '../../models/booking.model';

@Component({
  selector: 'app-booking-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-service.component.html',
  styles: [`
    .booking-service {
      padding: 20px 0;
    }
    
    .section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .section:last-child {
      border-bottom: none;
    }
    
    .section h3 {
      color: #374151;
      margin-bottom: 20px;
      font-size: 1.25rem;
    }
    
    .cost-breakdown {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .cost-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .cost-item:last-child {
      border-bottom: none;
    }
    
    .cost-item.subtotal {
      font-weight: 600;
      border-top: 2px solid #d1d5db;
      margin-top: 10px;
      padding-top: 12px;
    }
    
    .cost-item.total {
      font-weight: 700;
      font-size: 1.1rem;
      color: #4a90e2;
      border-top: 2px solid #4a90e2;
      margin-top: 10px;
      padding-top: 12px;
    }
    
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
    }
    
    @media (max-width: 768px) {
      .form-actions {
        flex-direction: column;
      }
      
      .form-actions button {
        width: 100%;
      }
    }
  `]
})
export class BookingServiceComponent implements OnInit {
  currentUser: User | null = null;
  newBooking: Partial<Booking> = {
    receiverName: '',
    receiverAddress: '',
    receiverPin: '',
    receiverMobile: '',
    parcelWeight: 0,
    parcelContents: '',
    deliveryType: '' as any,
    packingPreference: '' as any
  };

  calculatedCost = 0;
  showErrors = false;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  calculateCost(): void {
    if (this.newBooking.parcelWeight &&
      this.newBooking.deliveryType &&
      this.newBooking.packingPreference) {
      this.calculatedCost = this.bookingService.calculateParcelCost(
        this.newBooking.parcelWeight,
        this.newBooking.deliveryType,
        this.newBooking.packingPreference,
        true
      );
    }
  }

  getDeliveryCharge(): number {
    switch (this.newBooking.deliveryType) {
      case 'standard': return 30;
      case 'express': return 80;
      case 'same-day': return 150;
      default: return 0;
    }
  }

  getPackingCharge(): number {
    switch (this.newBooking.packingPreference) {
      case 'basic': return 10;
      case 'premium': return 30;
      default: return 0;
    }
  }

  getSubtotal(): number {
    return 50 + (this.newBooking.parcelWeight! * 0.02) + this.getDeliveryCharge() + this.getPackingCharge() + 50;
  }

  isValidMobile(mobile: string): boolean {
    return /^[0-9]{10}$/.test(mobile || '');
  }

  isValidPin(pin: string): boolean {
    return /^[0-9]{6}$/.test(pin || '');
  }

  validateForm(): boolean {
    return !!(
      this.newBooking.receiverName &&
      this.newBooking.receiverAddress &&
      this.isValidPin(this.newBooking.receiverPin!) &&
      this.isValidMobile(this.newBooking.receiverMobile!) &&
      this.newBooking.parcelWeight &&
      this.newBooking.parcelWeight > 0 &&
      this.newBooking.parcelContents &&
      this.newBooking.deliveryType &&
      this.newBooking.packingPreference
    );
  }

  submitBooking(): void {
    this.showErrors = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.validateForm()) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.isSubmitting = true;

    const booking: Booking = {
      bookingId: this.bookingService.generateBookingId(),
      customerId: this.currentUser?.userId || 'CUST001',
      customerName: this.currentUser?.name || 'Admin User',
      fullName: this.currentUser?.name || 'Admin User',
      address: this.currentUser?.address || '',
      contactDetails: this.currentUser?.contactDetails || '',
      receiverName: this.newBooking.receiverName!,
      receiverAddress: this.newBooking.receiverAddress!,
      receiverPin: this.newBooking.receiverPin!,
      receiverMobile: this.newBooking.receiverMobile!,
      dateOfBooking: new Date(),
      parcelWeight: this.newBooking.parcelWeight!,
      parcelContents: this.newBooking.parcelContents!,
      deliveryType: this.newBooking.deliveryType!,
      packingPreference: this.newBooking.packingPreference!,
      pickupTime: null,
      dropoffTime: null,
      parcelStatus: 'assigned', // Admin booking starts as assigned
      amount: this.calculatedCost,
      paymentTime: null,
      transactionId: null
    };

    this.bookingService.addBooking(booking).subscribe(success => {
      this.isSubmitting = false;
      if (success) {
        this.successMessage = `Booking created successfully! Booking ID: ${booking.bookingId}. Total Amount: ₹${booking.amount}. Customer will pay at the office, and after payment, the transaction ID and payment ID will be generated. Officer will then change the status from "Assigned" to "Booked".`;
        this.resetForm();
        this.showErrors = false;
      } else {
        this.errorMessage = 'Failed to create booking. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.newBooking = {
      receiverName: '',
      receiverAddress: '',
      receiverPin: '',
      receiverMobile: '',
      parcelWeight: 0,
      parcelContents: '',
      deliveryType: '' as any,
      packingPreference: '' as any
    };
    this.calculatedCost = 0;
    this.showErrors = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}