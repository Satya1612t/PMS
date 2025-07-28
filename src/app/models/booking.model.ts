export interface Booking {
  bookingId: string;
  customerId: string;
  customerName: string;
  fullName: string;
  address: string;
  contactDetails: string;
  receiverName: string;
  receiverAddress: string;
  receiverPin: string;
  receiverMobile: string;
  dateOfBooking: Date;
  parcelWeight: number;
  parcelContents: string;
  deliveryType: 'standard' | 'express' | 'same-day';
  packingPreference: 'basic' | 'premium';
  pickupTime: Date | null;
  dropoffTime: Date | null;
  parcelStatus: BookingStatus;
  amount: number;
  paymentTime: Date | null;
  transactionId: string | null;
}

export type BookingStatus = 'new' | 'booked' | 'scheduled' | 'pickedup' | 'assigned' | 'intransit' | 'delivered' | 'cancelled';

export interface BookingFilter {
  customerId?: string;
  bookingId?: string;
  bookingDate?: string;
  status?: BookingStatus;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface Feedback {
  orderId: string;
  customerName: string;
  feedbackDescription: string;
  rating: number;
  dateTime: Date;
}

export interface User {
  userId: string;
  name: string;
  address: string;
  contactDetails: string;
  role: 'admin' | 'officer' | 'customer';
}