import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-pickup-scheduling',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pickup-scheduling">
      <div class="container">
        <div class="card">
          <h2>Pickup Scheduling</h2>
          <p>Enter booking ID to view booking details and schedule pickup/dropoff times</p>
          
          <div class="form-group">
            <label for="bookingId" class="form-label">Booking ID *</label>
            <div class="search-container">
              <input
                type="text"
                id="bookingId"
                [(ngModel)]="bookingId"
                class="form-control"
                [class.error]="showError"
                placeholder="Enter Booking ID (e.g., BK001)"
                (keyup.enter)="searchBooking()"
              >
              <button type="button" class="btn btn-primary" (click)="searchBooking()">
                Search
              </button>
            </div>
            <div class="error-message" *ngIf="showError">
              {{ errorMessage }}
            </div>
          </div>

          <div class="success-message" *ngIf="successMessage">
            {{ successMessage }}
          </div>

          <div class="booking-details" *ngIf="booking">
            <h3>Booking Information</h3>
            <div class="details-grid grid grid-2">
              <div class="detail-item">
                <label>Booking ID:</label>
                <span>{{ booking.bookingId }}</span>
              </div>
              <div class="detail-item">
                <label>Full Name:</label>
                <span>{{ booking.fullName }}</span>
              </div>
              <div class="detail-item">
                <label>Address:</label>
                <span>{{ booking.address }}</span>
              </div>
              <div class="detail-item">
                <label>Receiver Name:</label>
                <span>{{ booking.receiverName }}</span>
              </div>
              <div class="detail-item">
                <label>Receiver Address:</label>
                <span>{{ booking.receiverAddress }}</span>
              </div>
              <div class="detail-item">
                <label>Date of Booking:</label>
                <span>{{ booking.dateOfBooking | date: 'medium' }}</span>
              </div>
              <div class="detail-item">
                <label>Parcel Status:</label>
                <span class="status-badge" [class]="'status-' + booking.parcelStatus">
                  {{ booking.parcelStatus | titlecase }}
                </span>
              </div>
              <div class="detail-item">
                <label>Current Pickup Time:</label>
                <span>{{ booking.pickupTime ? (booking.pickupTime | date: 'medium') : 'Not scheduled' }}</span>
              </div>
              <div class="detail-item">
                <label>Current Dropoff Time:</label>
                <span>{{ booking.dropoffTime ? (booking.dropoffTime | date: 'medium') : 'Not scheduled' }}</span>
              </div>
            </div>

            <div class="scheduling-section">
              <h4>Schedule Pickup & Dropoff</h4>
              <div class="grid grid-2">
                <div class="form-group">
                  <label for="pickupDateTime" class="form-label">Pickup Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="pickupDateTime"
                    [(ngModel)]="newPickupTime"
                    class="form-control"
                    [class.error]="showPickupError"
                    [min]="minDateTime"
                  >
                  <div class="error-message" *ngIf="showPickupError">
                    Please select a valid pickup date and time
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="dropoffDateTime" class="form-label">Dropoff Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="dropoffDateTime"
                    [(ngModel)]="newDropoffTime"
                    class="form-control"
                    [class.error]="showDropoffError"
                    [min]="minDropoffDateTime"
                  >
                  <div class="error-message" *ngIf="showDropoffError">
                    Please select a valid dropoff date and time (must be after pickup time)
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn btn-success" 
                  (click)="updateSchedule()"
                  [disabled]="isUpdating"
                >
                  {{ isUpdating ? 'Updating...' : 'Update Schedule' }}
                </button>
                <button 
                  type="button" 
                  class="btn btn-secondary" 
                  (click)="clearForm()"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pickup-scheduling {
      padding: 20px 0;
    }
    
    .search-container {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    
    .search-container input {
      flex: 1;
    }
    
    .booking-details {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
    }
    
    .details-grid {
      margin-bottom: 30px;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .detail-item label {
      font-weight: 600;
      color: #374151;
      font-size: 14px;
    }
    
    .detail-item span {
      color: #6b7280;
    }
    
    .scheduling-section {
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    
    .scheduling-section h4 {
      margin-bottom: 20px;
      color: #374151;
    }
    
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    
    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
      }
      
      .search-container button {
        width: 100%;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .form-actions button {
        width: 100%;
      }
    }
  `]
})
export class PickupSchedulingComponent {
  bookingId = '';
  booking: Booking | null = null;
  newPickupTime = '';
  newDropoffTime = '';
  showError = false;
  showPickupError = false;
  showDropoffError = false;
  errorMessage = '';
  successMessage = '';
  isUpdating = false;
  minDateTime = '';
  minDropoffDateTime = '';

  constructor(private bookingService: BookingService) {
    // Set minimum datetime to current time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  searchBooking(): void {
    if (!this.bookingId.trim()) {
      this.showError = true;
      this.errorMessage = 'Please enter a booking ID';
      return;
    }

    this.bookingService.getBookingById(this.bookingId.trim()).subscribe(booking => {
      if (booking) {
        this.booking = booking;
        this.showError = false;
        this.errorMessage = '';
        this.successMessage = '';
        
        // Pre-populate existing times if available
        if (booking.pickupTime) {
          const pickupDate = new Date(booking.pickupTime);
          pickupDate.setMinutes(pickupDate.getMinutes() - pickupDate.getTimezoneOffset());
          this.newPickupTime = pickupDate.toISOString().slice(0, 16);
        }
        
        if (booking.dropoffTime) {
          const dropoffDate = new Date(booking.dropoffTime);
          dropoffDate.setMinutes(dropoffDate.getMinutes() - dropoffDate.getTimezoneOffset());
          this.newDropoffTime = dropoffDate.toISOString().slice(0, 16);
        }
        
        this.updateMinDropoffTime();
      } else {
        this.booking = null;
        this.showError = true;
        this.errorMessage = 'Booking not found. Please check the booking ID and try again.';
        this.successMessage = '';
      }
    });
  }

  updateMinDropoffTime(): void {
    if (this.newPickupTime) {
      const pickupDate = new Date(this.newPickupTime);
      pickupDate.setHours(pickupDate.getHours() + 1); // Minimum 1 hour after pickup
      pickupDate.setMinutes(pickupDate.getMinutes() - pickupDate.getTimezoneOffset());
      this.minDropoffDateTime = pickupDate.toISOString().slice(0, 16);
    } else {
      this.minDropoffDateTime = this.minDateTime;
    }
  }

  updateSchedule(): void {
    this.showPickupError = false;
    this.showDropoffError = false;

    if (!this.newPickupTime) {
      this.showPickupError = true;
      return;
    }

    if (!this.newDropoffTime) {
      this.showDropoffError = true;
      return;
    }

    const pickupDate = new Date(this.newPickupTime);
    const dropoffDate = new Date(this.newDropoffTime);

    if (dropoffDate <= pickupDate) {
      this.showDropoffError = true;
      return;
    }

    if (!this.booking) {
      return;
    }

    this.isUpdating = true;

    this.bookingService.updatePickupSchedule(
      this.booking.bookingId,
      pickupDate,
      dropoffDate
    ).subscribe(success => {
      this.isUpdating = false;
      if (success) {
        this.booking!.pickupTime = pickupDate;
        this.booking!.dropoffTime = dropoffDate;
        this.successMessage = `Schedule successfully updated for booking ${this.booking!.bookingId}`;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      } else {
        this.errorMessage = 'Failed to update schedule. Please try again.';
      }
    });
  }

  clearForm(): void {
    this.bookingId = '';
    this.booking = null;
    this.newPickupTime = '';
    this.newDropoffTime = '';
    this.showError = false;
    this.showPickupError = false;
    this.showDropoffError = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.minDropoffDateTime = this.minDateTime;
  }
}