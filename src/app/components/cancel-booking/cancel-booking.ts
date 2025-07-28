import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancel-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-booking.html',
  styleUrl: './cancel-booking.css'
})
export class CancelBooking {

 bookingId = '';
  showError = false;
  errorMessage = '';
  successMessage = '';

  constructor(private bookingService: BookingService) {}

  cancelBooking(): void {
    if (!this.bookingId.trim()) {
      this.showError = true;
      this.errorMessage = 'Please enter a booking ID';
      this.successMessage = '';
      return;
    }

    this.bookingService.cancelBooking(this.bookingId.trim()).subscribe(result => {
      this.showError = false;
      if (result.success) {
        this.successMessage = `${result.message}. Booking ID: ${result.booking!.bookingId}, Amount: ₹${result.booking!.amount}`;
        this.errorMessage = '';
        this.bookingId = '';
      } else {
        this.successMessage = '';
        this.errorMessage = result.message;
      }
    });
  }
}