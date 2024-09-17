import { BookingInterface } from './IBooking';

export interface CustomerInterface {
  ID: number;
  CreatedAt: string;  // ISO 8601 date string
  UpdatedAt: string;  // ISO 8601 date string
  DeletedAt: string | null;
  Name: string;
  Address: string;
  PhoneNumber: string;
  Email: string;
  PaymentMethod: string;
  Bookings?: BookingInterface[];
}
