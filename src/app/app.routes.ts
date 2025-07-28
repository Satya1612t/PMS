import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Bookings } from './components/bookings/bookings';
import { BookingServiceComponent } from './components/booking-service/booking-service.component';
import { CancelBooking } from './components/cancel-booking/cancel-booking';
import { DeliveryStatusComponent } from './components/delivery-status/delivery-status.component';
import { PickupSchedulingComponent } from './components/pickup-scheduling/pickup-scheduling.component';
import { TrackingComponent } from './components/tracking/tracking.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'booking-service', component: BookingServiceComponent },
  { path: 'bookings', component: Bookings },
  { path: 'cancel-booking', component: CancelBooking },
  { path: 'delivery-status', component: DeliveryStatusComponent },
  { path: 'pickup-scheduling', component: PickupSchedulingComponent },
  { path: 'tracking', component: TrackingComponent },
  // { path: 'tracking', component: Tracking },
  { path: '**', redirectTo: '' } 
];