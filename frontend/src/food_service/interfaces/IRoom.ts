import { BookingInterface } from './IBooking';
import { RoomTypesInterface } from './IRoomTypes';

export interface RoomInterface {
  ID: number;
  Status: string;
  Address: string;
  TotalPrice: number;
  Bookings?: BookingInterface[];
  RoomTypesId: number | null;
  RoomTypes?: RoomTypesInterface;
}
