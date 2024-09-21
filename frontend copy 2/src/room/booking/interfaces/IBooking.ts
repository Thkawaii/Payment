import { CustomersInterface } from './ICustomer';
import { RoomInterface } from './IRoom';

export interface BookingInterface {
  ID?: number;
  CheckIn: string;  // ISO 8601 date string
  CheckOut: string; // ISO 8601 date string
  CustomerID: number | null;
  Customer?: CustomersInterface;
  RoomID: number | null;
  Room?: RoomInterface;
}
