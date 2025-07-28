import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Booking, BookingFilter, PaginationInfo, Feedback, BookingStatus } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  public bookings$ = this.bookingsSubject.asObservable();

  private feedbackSubject = new BehaviorSubject<Feedback[]>([]);
  public feedback$ = this.feedbackSubject.asObservable();

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    const sampleBookings: Booking[] = [
      {
        bookingId: 'BK001',
        customerId: 'CUST001',
        customerName: 'Rajesh Kumar',
        fullName: 'Rajesh Kumar',
        address: '123 MG Road, Bangalore',
        contactDetails: '+91 9876543210',
        receiverName: 'Priya Sharma',
        receiverAddress: '456 Park Street, Mumbai',
        receiverPin: '400001',
        receiverMobile: '+91 9876543211',
        dateOfBooking: new Date('2024-01-15'),
        parcelWeight: 2000,
        parcelContents: 'Electronics - Mobile Phone',
        deliveryType: 'express',
        packingPreference: 'premium',
        pickupTime: new Date('2024-01-16T10:00:00'),
        dropoffTime: new Date('2024-01-17T15:00:00'),
        parcelStatus: 'delivered',
        amount: 285.25,
        paymentTime: new Date('2024-01-15T14:30:00'),
        transactionId: 'TXN001'
      },
      {
        bookingId: 'BK002',
        customerId: 'CUST002',
        customerName: 'Sunita Patel',
        fullName: 'Sunita Patel',
        address: '789 Lake View, Chennai',
        contactDetails: '+91 9876543212',
        receiverName: 'Amit Patel',
        receiverAddress: '321 Hill Station, Pune',
        receiverPin: '411001',
        receiverMobile: '+91 9876543213',
        dateOfBooking: new Date('2024-01-16'),
        parcelWeight: 1500,
        parcelContents: 'Documents - Legal Papers',
        deliveryType: 'standard',
        packingPreference: 'basic',
        pickupTime: new Date('2024-01-17T09:00:00'),
        dropoffTime: null,
        parcelStatus: 'intransit',
        amount: 195.50,
        paymentTime: new Date('2024-01-16T11:15:00'),
        transactionId: 'TXN002'
      },
      {
        bookingId: 'BK003',
        customerId: 'CUST003',
        customerName: 'Mohammed Ali',
        fullName: 'Mohammed Ali',
        address: '555 Garden Road, Hyderabad',
        contactDetails: '+91 9876543214',
        receiverName: 'Fatima Ali',
        receiverAddress: '777 New Colony, Kolkata',
        receiverPin: '700001',
        receiverMobile: '+91 9876543215',
        dateOfBooking: new Date('2024-01-17'),
        parcelWeight: 3000,
        parcelContents: 'Books - Educational Materials',
        deliveryType: 'same-day',
        packingPreference: 'premium',
        pickupTime: null,
        dropoffTime: null,
        parcelStatus: 'booked',
        amount: 420.75,
        paymentTime: new Date('2024-01-17T16:45:00'),
        transactionId: 'TXN003'
      },
      {
        bookingId: 'BK004',
        customerId: 'CUST004',
        customerName: 'Deepa Singh',
        fullName: 'Deepa Singh',
        address: '999 Metro Street, Delhi',
        contactDetails: '+91 9876543216',
        receiverName: 'Vikram Singh',
        receiverAddress: '888 Business District, Gurgaon',
        receiverPin: '122001',
        receiverMobile: '+91 9876543217',
        dateOfBooking: new Date('2024-01-18'),
        parcelWeight: 500,
        parcelContents: 'Gift - Jewelry',
        deliveryType: 'express',
        packingPreference: 'premium',
        pickupTime: new Date('2024-01-19T14:00:00'),
        dropoffTime: new Date('2024-01-20T11:30:00'),
        parcelStatus: 'scheduled',
        amount: 175.00,
        paymentTime: null,
        transactionId: null
      },
      {
        bookingId: 'BK005',
        customerId: 'CUST005',
        customerName: 'Anita Gupta',
        fullName: 'Anita Gupta',
        address: '444 Shopping Complex, Jaipur',
        contactDetails: '+91 9876543218',
        receiverName: 'Rohit Gupta',
        receiverAddress: '333 Tech Park, Bangalore',
        receiverPin: '560001',
        receiverMobile: '+91 9876543219',
        dateOfBooking: new Date('2024-01-19'),
        parcelWeight: 1200,
        parcelContents: 'Clothing - Traditional Wear',
        deliveryType: 'standard',
        packingPreference: 'basic',
        pickupTime: null,
        dropoffTime: null,
        parcelStatus: 'new',
        amount: 0,
        paymentTime: null,
        transactionId: null
      }
    ];

    const sampleFeedback: Feedback[] = [
      {
        orderId: 'BK001',
        customerName: 'Rajesh Kumar',
        feedbackDescription: 'Excellent service! Package delivered on time and in perfect condition.',
        rating: 5,
        dateTime: new Date('2024-01-17T16:00:00')
      },
      {
        orderId: 'BK006',
        customerName: 'Meera Nair',
        feedbackDescription: 'Good service but delivery was slightly delayed. Overall satisfied.',
        rating: 4,
        dateTime: new Date('2024-01-16T12:30:00')
      },
      {
        orderId: 'BK007',
        customerName: 'Karan Thakur',
        feedbackDescription: 'Very professional handling of fragile items. Highly recommended!',
        rating: 5,
        dateTime: new Date('2024-01-15T14:15:00')
      }
    ];

    this.bookingsSubject.next(sampleBookings);
    this.feedbackSubject.next(sampleFeedback);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.bookings$;
  }

  getBookingById(bookingId: string): Observable<Booking | null> {
    const bookings = this.bookingsSubject.value;
    const booking = bookings.find(b => b.bookingId === bookingId);
    return of(booking || null);
  }

  getFilteredBookings(filter: BookingFilter, page: number = 1, itemsPerPage: number = 10): Observable<{bookings: Booking[], pagination: PaginationInfo}> {
    let filteredBookings = [...this.bookingsSubject.value];

    // Apply filters
    if (filter.customerId) {
      filteredBookings = filteredBookings.filter(b => 
        b.customerId.toLowerCase().includes(filter.customerId!.toLowerCase())
      );
    }
    if (filter.bookingId) {
      filteredBookings = filteredBookings.filter(b => 
        b.bookingId.toLowerCase().includes(filter.bookingId!.toLowerCase())
      );
    }
    if (filter.bookingDate) {
      const filterDate = new Date(filter.bookingDate);
      filteredBookings = filteredBookings.filter(b => 
        b.dateOfBooking.toDateString() === filterDate.toDateString()
      );
    }
    if (filter.status) {
      filteredBookings = filteredBookings.filter(b => b.parcelStatus === filter.status);
    }

    // Sort by booking date (descending)
    filteredBookings.sort((a, b) => b.dateOfBooking.getTime() - a.dateOfBooking.getTime());

    // Apply pagination
    const totalItems = filteredBookings.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage
    };

    return of({ bookings: paginatedBookings, pagination });
  }

  addBooking(booking: Booking): Observable<boolean> {
    const bookings = this.bookingsSubject.value;
    bookings.push(booking);
    this.bookingsSubject.next(bookings);
    return of(true);
  }

  updateBookingStatus(bookingId: string, status: BookingStatus): Observable<boolean> {
    const bookings = this.bookingsSubject.value;
    const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);
    
    if (bookingIndex !== -1) {
      bookings[bookingIndex].parcelStatus = status;
      this.bookingsSubject.next(bookings);
      return of(true);
    }
    return of(false);
  }

  updatePickupSchedule(bookingId: string, pickupTime: Date, dropoffTime: Date): Observable<boolean> {
    const bookings = this.bookingsSubject.value;
    const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);
    
    if (bookingIndex !== -1) {
      bookings[bookingIndex].pickupTime = pickupTime;
      bookings[bookingIndex].dropoffTime = dropoffTime;
      this.bookingsSubject.next(bookings);
      return of(true);
    }
    return of(false);
  }

  cancelBooking(bookingId: string): Observable<{success: boolean, booking?: Booking, message: string}> {
    const bookings = this.bookingsSubject.value;
    const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);
    
    if (bookingIndex === -1) {
      return of({
        success: false,
        message: 'Booking cancel failed - Booking not found'
      });
    }

    const booking = bookings[bookingIndex];
    
    if (booking.parcelStatus === 'delivered' || booking.parcelStatus === 'intransit') {
      return of({
        success: false,
        message: 'Cannot cancel booking - Parcel is already delivered or in transit'
      });
    }

    booking.parcelStatus = 'cancelled';
    this.bookingsSubject.next(bookings);
    
    return of({
      success: true,
      booking,
      message: 'Booking cancelled successfully and Booking Amount will be refunded to the customer account within 5 working days'
    });
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.feedback$;
  }

  calculateParcelCost(weight: number, deliveryType: string, packingPreference: string, isAdminBooking: boolean = true): number {
    const baseRate = 50;
    const weightCharge = weight * 0.02;
    
    let deliveryCharge = 0;
    switch (deliveryType) {
      case 'standard':
        deliveryCharge = 30;
        break;
      case 'express':
        deliveryCharge = 80;
        break;
      case 'same-day':
        deliveryCharge = 150;
        break;
    }
    
    let packingCharge = 0;
    switch (packingPreference) {
      case 'basic':
        packingCharge = 10;
        break;
      case 'premium':
        packingCharge = 30;
        break;
    }
    
    const adminFee = isAdminBooking ? 50 : 0;
    const taxRate = 0.05;
    
    const subtotal = baseRate + weightCharge + deliveryCharge + packingCharge + adminFee;
    const total = subtotal * (1 + taxRate);
    
    return Math.round(total * 100) / 100;
  }

  generateBookingId(): string {
    const timestamp = Date.now().toString().slice(-6);
    return `BK${timestamp}`;
  }
}