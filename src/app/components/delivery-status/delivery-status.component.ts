import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking, BookingStatus } from '../../models/booking.model';

@Component({
  selector: 'app-delivery-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="delivery-status">
      <div class="container">
        <div class="card">
          <h2>Update Delivery Status</h2>
          <p>Enter booking ID to view and update parcel delivery status</p>
          
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
                <label>Current Status:</label>
                <span class="status-badge" [class]="'status-' + booking.parcelStatus">
                  {{ booking.parcelStatus | titlecase }}
                </span>
              </div>
            </div>

            <div class="status-update-section">
              <h4>Update Status</h4>
              <div class="form-group">
                <label for="newStatus" class="form-label">New Status *</label>
                <select
                  id="newStatus"
                  [(ngModel)]="selectedStatus"
                  class="form-control"
                  [class.error]="showStatusError"
                >
                  <option value="">Select new status</option>
                  <option value="new">New</option>
                  <option value="booked">Booked</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="pickedup">Picked Up</option>
                  <option value="assigned">Assigned</option>
                  <option value="intransit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div class="error-message" *ngIf="showStatusError">
                  Please select a status to update
                </div>
              </div>
              
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn btn-success" 
                  (click)="updateStatus()"
                  [disabled]="isUpdating"
                >
                  {{ isUpdating ? 'Updating...' : 'Update Status' }}
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
    .delivery-status {
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
    
    .status-update-section {
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    
    .status-update-section h4 {
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
export class DeliveryStatusComponent {
  bookingId = '';
  booking: Booking | null = null;
  selectedStatus: BookingStatus | '' = '';
  showError = false;
  showStatusError = false;
  errorMessage = '';
  successMessage = '';
  isUpdating = false;

  constructor(private bookingService: BookingService) {}

  searchBooking(): void {
    if (!this.bookingId.trim()) {
      this.showError = true;
      this.errorMessage = 'Please enter a booking ID';
      return;
    }

    this.bookingService.getBookingById(this.bookingId.trim()).subscribe(booking => {
      if (booking) {
        this.booking = booking;
        this.selectedStatus = booking.parcelStatus;
        this.showError = false;
        this.errorMessage = '';
        this.successMessage = '';
      } else {
        this.booking = null;
        this.selectedStatus = '';
        this.showError = true;
        this.errorMessage = 'Booking not found. Please check the booking ID and try again.';
        this.successMessage = '';
      }
    });
  }

  updateStatus(): void {
    if (!this.selectedStatus) {
      this.showStatusError = true;
      return;
    }

    if (!this.booking) {
      return;
    }

    this.isUpdating = true;
    this.showStatusError = false;

    this.bookingService.updateBookingStatus(this.booking.bookingId, this.selectedStatus as BookingStatus)
      .subscribe(success => {
        this.isUpdating = false;
        if (success) {
          this.booking!.parcelStatus = this.selectedStatus as BookingStatus;
          this.successMessage = `Status successfully updated to "${this.selectedStatus.toUpperCase()}" for booking ${this.booking!.bookingId}`;
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        } else {
          this.errorMessage = 'Failed to update status. Please try again.';
        }
      });
  }

  clearForm(): void {
    this.bookingId = '';
    this.booking = null;
    this.selectedStatus = '';
    this.showError = false;
    this.showStatusError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
}