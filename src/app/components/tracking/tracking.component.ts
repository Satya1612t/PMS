import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tracking">
      <div class="container">
        <div class="card">
          <h2>Track Your Parcel</h2>
          <p>Enter your booking ID to track the current status of your parcel</p>
          
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

          <div class="booking-details" *ngIf="booking">
            <h3>Booking Details</h3>
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
                <label>Amount:</label>
                <span>₹{{ booking.amount }}</span>
              </div>
            </div>

            <div class="tracking-timeline" *ngIf="booking.parcelStatus !== 'new'">
              <h4>Tracking Timeline</h4>
              <div class="timeline">
                <div 
                  class="timeline-item" 
                  [class.completed]="isStatusCompleted('booked')"
                  [class.current]="booking.parcelStatus === 'booked'"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h5>Booked</h5>
                    <p>Booking confirmed and payment received</p>
                  </div>
                </div>
                <div 
                  class="timeline-item" 
                  [class.completed]="isStatusCompleted('scheduled')"
                  [class.current]="booking.parcelStatus === 'scheduled'"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h5>Scheduled</h5>
                    <p>Pickup and delivery scheduled</p>
                  </div>
                </div>
                <div 
                  class="timeline-item" 
                  [class.completed]="isStatusCompleted('pickedup')"
                  [class.current]="booking.parcelStatus === 'pickedup'"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h5>Picked Up</h5>
                    <p>Package collected from sender</p>
                  </div>
                </div>
                <div 
                  class="timeline-item" 
                  [class.completed]="isStatusCompleted('intransit')"
                  [class.current]="booking.parcelStatus === 'intransit'"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h5>In Transit</h5>
                    <p>Package on the way to destination</p>
                  </div>
                </div>
                <div 
                  class="timeline-item" 
                  [class.completed]="isStatusCompleted('delivered')"
                  [class.current]="booking.parcelStatus === 'delivered'"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h5>Delivered</h5>
                    <p>Package successfully delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tracking {
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
    
    .tracking-timeline h4 {
      margin-bottom: 20px;
      color: #374151;
    }
    
    .timeline {
      position: relative;
      padding-left: 30px;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e5e7eb;
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 30px;
    }
    
    .timeline-marker {
      position: absolute;
      left: -22px;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #e5e7eb;
      border: 3px solid white;
      box-shadow: 0 0 0 3px #e5e7eb;
    }
    
    .timeline-item.completed .timeline-marker {
      background: #22c55e;
      box-shadow: 0 0 0 3px #22c55e;
    }
    
    .timeline-item.current .timeline-marker {
      background: #4a90e2;
      box-shadow: 0 0 0 3px #4a90e2;
      animation: pulse 2s infinite;
    }
    
    .timeline-content h5 {
      margin: 0 0 4px 0;
      color: #374151;
      font-size: 16px;
    }
    
    .timeline-content p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }
    
    .timeline-item.completed .timeline-content h5 {
      color: #22c55e;
    }
    
    .timeline-item.current .timeline-content h5 {
      color: #4a90e2;
      font-weight: 600;
    }
    
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 3px #4a90e2;
      }
      70% {
        box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
      }
      100% {
        box-shadow: 0 0 0 3px #4a90e2;
      }
    }
    
    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
      }
      
      .search-container button {
        width: 100%;
      }
    }
  `]
})
export class TrackingComponent {
  bookingId = '';
  booking: Booking | null = null;
  showError = false;
  errorMessage = '';

  private statusOrder = ['new', 'booked', 'scheduled', 'pickedup', 'intransit', 'delivered'];

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
        this.showError = false;
        this.errorMessage = '';
      } else {
        this.booking = null;
        this.showError = true;
        this.errorMessage = 'Booking not found. Please check the booking ID and try again.';
      }
    });
  }

  isStatusCompleted(status: string): boolean {
    if (!this.booking) return false;
    
    const currentIndex = this.statusOrder.indexOf(this.booking.parcelStatus);
    const statusIndex = this.statusOrder.indexOf(status);
    
    return currentIndex > statusIndex;
  }
}