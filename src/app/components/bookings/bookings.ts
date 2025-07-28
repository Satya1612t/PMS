import { Component, OnInit } from '@angular/core';
import { Booking, BookingFilter, Feedback, PaginationInfo } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Modal } from '../shared/modal/modal';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule, FormsModule, RouterModule, Modal],
  template: `
    <div class="bookings">
      <div class="container">
        <div class="page-header">
          <h2>View All Bookings</h2>
          <div class="header-actions">
            <button class="btn btn-primary" (click)="showFeedbackModal = true">
              View Feedback
            </button>
            <button 
              class="btn btn-success" 
              (click)="exportData()"
              *ngIf="pagination.totalItems > 10"
            >
              Export Data
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters">
          <div class="form-group">
            <label for="customerIdFilter" class="form-label">Customer ID</label>
            <input
              type="text"
              id="customerIdFilter"
              [(ngModel)]="filter.customerId"
              class="form-control"
              placeholder="Enter Customer ID"
              (input)="applyFilters()"
            >
          </div>
          <div class="form-group">
            <label for="bookingIdFilter" class="form-label">Booking ID</label>
            <input
              type="text"
              id="bookingIdFilter"
              [(ngModel)]="filter.bookingId"
              class="form-control"
              placeholder="Enter Booking ID"
              (input)="applyFilters()"
            >
          </div>
          <div class="form-group">
            <label for="bookingDateFilter" class="form-label">Booking Date</label>
            <input
              type="date"
              id="bookingDateFilter"
              [(ngModel)]="filter.bookingDate"
              class="form-control"
              (change)="applyFilters()"
            >
          </div>
          <div class="form-group">
            <label for="statusFilter" class="form-label">Status</label>
            <select
              id="statusFilter"
              [(ngModel)]="filter.status"
              class="form-control"
              (change)="applyFilters()"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="booked">Booked</option>
              <option value="scheduled">Scheduled</option>
              <option value="pickedup">Picked Up</option>
              <option value="assigned">Assigned</option>
              <option value="intransit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">&nbsp;</label>
            <button type="button" class="btn btn-secondary" (click)="clearFilters()">
              Clear Filters
            </button>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
          <p>Showing {{ bookings.length }} of {{ pagination.totalItems }} bookings</p>
        </div>

        <!-- Bookings Table -->
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Receiver Name</th>
                <th>Delivery Address</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let booking of bookings">
                <td>{{ booking.customerId }}</td>
                <td>{{ booking.customerName }}</td>
                <td>{{ booking.bookingId }}</td>
                <td>{{ booking.dateOfBooking | date: 'short' }}</td>
                <td>{{ booking.receiverName }}</td>
                <td>{{ booking.receiverAddress }}</td>
                <td>₹{{ booking.amount }}</td>
                <td>
                  <span class="status-badge" [class]="'status-' + booking.parcelStatus">
                    {{ booking.parcelStatus | titlecase }}
                  </span>
                </td>
                <td>
                  <button 
                    class="btn btn-primary" 
                    (click)="viewBookingDetails(booking)"
                    style="font-size: 12px; padding: 6px 12px;"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="no-results" *ngIf="bookings.length === 0">
            <p>No bookings found matching your criteria.</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination" *ngIf="pagination.totalPages > 1">
          <button 
            (click)="changePage(1)" 
            [disabled]="pagination.currentPage === 1"
          >
            First
          </button>
          <button 
            (click)="changePage(pagination.currentPage - 1)" 
            [disabled]="pagination.currentPage === 1"
          >
            Previous
          </button>
          
          <span class="page-info">
            Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
          </span>
          
          <button 
            (click)="changePage(pagination.currentPage + 1)" 
            [disabled]="pagination.currentPage === pagination.totalPages"
          >
            Next
          </button>
          <button 
            (click)="changePage(pagination.totalPages)" 
            [disabled]="pagination.currentPage === pagination.totalPages"
          >
            Last
          </button>
        </div>
      </div>
    </div>

    <!-- Booking Details Modal -->
    <app-modal
      [isOpen]="showDetailsModal"
      [title]="'Booking Details - ' + (selectedBooking?.bookingId || '')"
      [showFooter]="false"
      (close)="showDetailsModal = false"
    >
      <div *ngIf="selectedBooking" class="booking-details-modal">
        <div class="details-grid grid grid-2">
          <div class="detail-item">
            <label>Booking ID:</label>
            <span>{{ selectedBooking.bookingId }}</span>
          </div>
          <div class="detail-item">
            <label>Customer ID:</label>
            <span>{{ selectedBooking.customerId }}</span>
          </div>
          <div class="detail-item">
            <label>Customer Name:</label>
            <span>{{ selectedBooking.customerName }}</span>
          </div>
          <div class="detail-item">
            <label>Address:</label>
            <span>{{ selectedBooking.address }}</span>
          </div>
          <div class="detail-item">
            <label>Contact:</label>
            <span>{{ selectedBooking.contactDetails }}</span>
          </div>
          <div class="detail-item">
            <label>Receiver Name:</label>
            <span>{{ selectedBooking.receiverName }}</span>
          </div>
          <div class="detail-item">
            <label>Receiver Address:</label>
            <span>{{ selectedBooking.receiverAddress }}</span>
          </div>
          <div class="detail-item">
            <label>Receiver Mobile:</label>
            <span>{{ selectedBooking.receiverMobile }}</span>
          </div>
          <div class="detail-item">
            <label>Parcel Weight:</label>
            <span>{{ selectedBooking.parcelWeight }}g</span>
          </div>
          <div class="detail-item">
            <label>Contents:</label>
            <span>{{ selectedBooking.parcelContents }}</span>
          </div>
          <div class="detail-item">
            <label>Delivery Type:</label>
            <span>{{ selectedBooking.deliveryType | titlecase }}</span>
          </div>
          <div class="detail-item">
            <label>Packing:</label>
            <span>{{ selectedBooking.packingPreference | titlecase }}</span>
          </div>
          <div class="detail-item">
            <label>Status:</label>
            <span class="status-badge" [class]="'status-' + selectedBooking.parcelStatus">
              {{ selectedBooking.parcelStatus | titlecase }}
            </span>
          </div>
          <div class="detail-item">
            <label>Amount:</label>
            <span>₹{{ selectedBooking.amount }}</span>
          </div>
        </div>
      </div>
    </app-modal>

    <!-- Feedback Modal -->
    <app-modal
      [isOpen]="showFeedbackModal"
      title="Customer Feedback"
      [showFooter]="false"
      (close)="showFeedbackModal = false"
    >
      <div class="feedback-list">
        <div class="feedback-item" *ngFor="let feedback of feedbackList">
          <div class="feedback-header">
            <h4>Order: {{ feedback.orderId }}</h4>
            <div class="rating">
              <span *ngFor="let star of getStars(feedback.rating)" [class]="star.class">★</span>
            </div>
          </div>
          <p><strong>Customer:</strong> {{ feedback.customerName }}</p>
          <p><strong>Feedback:</strong> {{ feedback.feedbackDescription }}</p>
          <p><strong>Date:</strong> {{ feedback.dateTime | date: 'medium' }}</p>
        </div>
        <div class="no-feedback" *ngIf="feedbackList.length === 0">
          <p>No feedback available.</p>
        </div>
      </div>
    </app-modal>
  `,
  styleUrl: './bookings.css'
})

export class Bookings implements OnInit {

  bookings: Booking[] = [];
  filter: BookingFilter = {};
  pagination: PaginationInfo = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  };
  
  showDetailsModal = false;
  showFeedbackModal = false;
  selectedBooking: Booking | null = null;
  feedbackList: Feedback[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadFeedback();
  }

  loadBookings(): void {
    this.bookingService.getFilteredBookings(this.filter, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(result => {
        this.bookings = result.bookings;
        this.pagination = result.pagination;
      });
  }

  loadFeedback(): void {
    this.bookingService.getAllFeedback().subscribe(feedback => {
      this.feedbackList = feedback;
    });
  }

  applyFilters(): void {
    this.pagination.currentPage = 1;
    this.loadBookings();
  }

  clearFilters(): void {
    this.filter = {};
    this.pagination.currentPage = 1;
    this.loadBookings();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
      this.loadBookings();
    }
  }

  viewBookingDetails(booking: Booking): void {
    this.selectedBooking = booking;
    this.showDetailsModal = true;
  }

  exportData(): void {
    // In a real application, this would generate and download an Excel/PDF file
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateCSV(): string {
    const headers = [
      'Customer ID',
      'Customer Name',
      'Booking ID',
      'Booking Date',
      'Receiver Name',
      'Delivery Address',
      'Amount',
      'Status'
    ];
    
    let csv = headers.join(',') + '\n';
    
    this.bookings.forEach(booking => {
      const row = [
        booking.customerId,
        booking.customerName,
        booking.bookingId,
        booking.dateOfBooking.toISOString().split('T')[0],
        booking.receiverName,
        `"${booking.receiverAddress}"`,
        booking.amount,
        booking.parcelStatus
      ];
      csv += row.join(',') + '\n';
    });
    
    return csv;
  }

  getStars(rating: number): { class: string }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ class: i <= rating ? 'filled' : 'empty' });
    }
    return stars;
  }
}