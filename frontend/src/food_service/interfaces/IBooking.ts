import { CustomerInterface } from './ICustomer';
import { RoomInterface } from './IRoom';

export interface BookingInterface {
  ID: number;
  CheckIn: string;  // ISO 8601 date string
  CheckOut: string; // ISO 8601 date string
  CustomerId: number | null;
  Customer?: CustomerInterface;
  RoomId: number | null;
  Room?: RoomInterface;
}
