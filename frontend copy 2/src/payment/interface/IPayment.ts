import { BookingInterface } from "../../room/booking/interfaces/IBooking";

export interface PaymentInterface {
    ID?: number;
	PaymentDate: Date
	TotalAmount: number
	PaymentMethod: string
    BookingID: number
	Booking?: BookingInterface
}
