export interface OrderInterface {
  ID?: number;
  OrderDate: Date;
  Amount: number | undefined;
  Price: number;
  MenuID: number;
  BookingID: number;
}
