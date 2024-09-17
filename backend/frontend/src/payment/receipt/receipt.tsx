import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaymentInterface } from '../interface/IPayment';
import { GetPaymentById } from '../services/https/PaymentAPI';
import { OrderInterface } from '../../food_service/interfaces/IOrder';
import { GetBookingsById, GetRoomsById } from '../../room/booking/services/https';
import { GetOrders } from '../../food_service/services/https/OrderAPI';
import { BookingInterface } from '../../room/booking/interfaces/IBooking';
import './App.css';
import { RoomInterface } from '../../room/booking/interfaces/IRoom';


const Receipt = () => {
  const [payment, setPayment] = useState<PaymentInterface | null>(null);
  const [booking, setBooking] = useState<BookingInterface | null>(null); // Change to single object
  const [room, setRoom] = useState<RoomInterface | null>(null);
  const [order, setOrder] = useState<OrderInterface[]>([]);

  const location = useLocation();
  const { paymentID, bookingID, roomID } = location.state || {};

  useEffect(() => {
    console.log("Received paymentID:", paymentID);
    console.log("Received bookingID:", bookingID);
    console.log("Received roomID:", roomID);

    if (paymentID) {
      fetchPayment(paymentID);
      fetchBooking(bookingID);
      fetchRoom(roomID);
      fetchOrder();
    }
  }, [paymentID]);

  const fetchPayment = async (id: number) => {
    try {
      const response = await GetPaymentById(id);
      console.log("API GetPaymentById for Receipt: ", response.BookingID);
      
      
      if (response?.BookingID) {
        setPayment(response);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const fetchBooking = async (bookingID: number) => {
    try {
      const response = await GetBookingsById(bookingID);
      console.log("GetBookingsById: ", response);
      

      if (response?.ID) {
        setBooking(response);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const fetchRoom = async (roomID: number) => {
    try {
      const response = await GetRoomsById(roomID);
      console.log("GetRoomsById: ", response);
      

      if (response?.ID) {
        setRoom(response);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      // Assuming you need to filter orders by booking ID; update this if necessary
      const response = await GetOrders();
      const filteredOrders = response.filter((order: { BookingID: number; }) => order.BookingID === bookingID);
      console.log("filteredOrders: ", filteredOrders);
      setOrder(filteredOrders);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  return (
    <div className="receipt">
      <header className="receipt-header">
        <h1>Receipt</h1>
      </header>

      {booking && (
        <div className="receipt-room">
           <span className="menu">{booking.Customer?.Name}</span>
           <span className="amount">{booking.Room?.Address}</span>
           <span className="price">${booking.RoomID == room?.ID ? room?.RoomTypes?.PricePerNight : null}</span>
        </div>
      )}

      <div className="receipt-divider"></div>

      {order.map((order) => (
        <div key={order.ID} className="receipt-order">
          <span className="a">{order.Menu?.MenuList}</span>
          <span className="b">x{order.Amount}</span>
          <span className="c">${order.Price.toFixed(2)}</span>
        </div>
      ))}

      <div className="receipt-total">
        {payment && (
          <h3>Total Payment: ${payment.TotalAmount.toFixed(2)}</h3>
        )}
      </div>
      <div className="receipt-divider1"></div>
      <div className="qr-code-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
        alt="QR Code"
        className="qr-code"
      />
      </div>
      <p className="thank-you">------THANK YOU------</p>
    </div>
  );
};

export default Receipt;
