import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { PaymentInterface } from "./interface/IPayment";
import {
  DeleteOrderByID,
  GetOrders,
} from "../food_service/services/https/OrderAPI";
import { OrderInterface } from "../food_service/interfaces/IOrder";
import "./App.css";
import { CreatePayments } from "./services/https/PaymentAPI";
import { message, Modal } from "antd";
import { BookingInterface } from "../room/booking/interfaces/IBooking";
import { DeleteBookingByID, GetBookings, GetRooms, UpdateRoom } from "../room/booking/services/https";
import { RoomInterface } from "../room/booking/interfaces/IRoom";

function Payment() {
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [order, setOrder] = useState<OrderInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const fetchBooking = async () => {
    try {
      const response = await GetBookings();
      console.log("API booking response for payment: ", response);
      if (Array.isArray(response)) {
        setBooking(response);
      } else {
        console.error("API did not return expected array format:", response);
        setBooking([]);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const fetchRoom = async () => {
    try {
      const response = await GetRooms();
      console.log("GetRooms response: ", response);
      if (Array.isArray(response)) {
        setRoom(response);
      } else {
        console.error("API did not return expected array format:", response);
        setRoom([]);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await GetOrders();
      console.log("API order response for payment: ", response);
      if (Array.isArray(response)) {
        setOrder(response);
      } else {
        setOrder([]);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchBooking();
    fetchRoom();
    fetchOrder();
  }, []); // Empty array ensures it only runs on component mount

  console.log("booking for payment: ", booking);
  console.log("order for payment: ", order);
  console.log("room for payment: ", room);

  const handleDeleteBooking = async (booking: BookingInterface, RoomID: number) => {
    if (booking.ID) {
      const success = await DeleteBookingByID(booking.ID);
      if (success) {
        
        const roomUpdate: RoomInterface = {
          ID: RoomID,
          Status: "Vacant", // Update status to Invalid
        };

        const roomPach = await UpdateRoom(roomUpdate);
        console.log("UpdateRoom form payment:", roomPach)
        if (roomPach) {
          message.success('Delete Booking Successfully');
          fetchBooking(); // Refresh the list after deletion
          fetchOrder();
        }else {
          message.success('Update Room Failed');
        }
      } else {
        message.success('Delete Booking Failed');
      }
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (id) {
      const success = await DeleteOrderByID(id);
      if (success) {
        message.success('Delete Order Successfully');
        fetchOrder(); // Refresh the list after deletion
      } else {
        message.success('Delete Order Failed');
      }
    }
  };

  const confirmCancalBooking = (booking: BookingInterface, RoomID: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => handleDeleteBooking(booking, RoomID),
    });
  };

  const confirmCancalOrder = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => handleDeleteOrder(id),
    });
  };

  const handleConfirm = async (booking_id: number) => {
    const selectedBooking = booking.find((b) => b.ID === booking_id);
  
    if (!selectedBooking) {
      console.error("Selected booking not found");
      return;
    }
  
    const roomID = selectedBooking.Room?.ID;
    let roomPrice: number = 0; // Initialize as a number
  
    if (roomID) {
      // Find room details from the room state
      const roomDetails = room.find(r => r.ID === roomID);
  
      // Ensure roomPrice is a number
      roomPrice = roomDetails?.RoomTypes?.PricePerNight 
        ? Number(roomDetails.RoomTypes.PricePerNight) 
        : 0;
    }
  
    console.log("Room Price: ", roomPrice);
  
    const relatedOrders = order.filter((o) => o.BookingID === booking_id);
    const ordersTotalPrice = relatedOrders.reduce((total, currentOrder) => {
      // Ensure Price is a number
      const orderPrice = Number(currentOrder.Price) || 0; 
      return total + orderPrice;
    }, 0);
  
    console.log("Orders Total Price: ", ordersTotalPrice);
  
    const totalAmount = roomPrice + ordersTotalPrice;
  
    console.log("Total Amount: ", totalAmount);
  
    const paymentData: PaymentInterface = {
      PaymentDate: new Date(),
      TotalAmount: totalAmount,
      PaymentMethod: "credit",
      BookingID: booking_id,
    };
  
    const res = await CreatePayments(paymentData);
    console.log("CreatePayments Response: ", res);
  
    if (res) {
      messageApi.open({
        type: "success",
        content: "Data saved successfully",
      });
  
      setTimeout(() => navigate("/login/receipt", { state: { paymentID: res.data.ID, bookingID: booking_id, roomID: roomID } }), 500);
    } else {
      messageApi.open({
        type: "error",
        content: "Error!",
      });
    }
  };
  
  return (
    <div className="app-container">
      {contextHolder}
      <header>
        <h1>Payment System</h1>
        <MdOutlinePayment className="icon-style" />
      </header>
      
      <section className="payment-section">
        <h2>Booking</h2>
        <div className="booking-table-container"></div>
        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Customer</th>
                <th>Room</th>
                <th>Room Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((b) => {
                const matchedRoom = room.find(r => r.ID === b.Room?.ID);
                return (
                  <tr key={b.ID}>
                    <td>{b.ID}</td>
                    <td>{b.CheckIn}</td>
                    <td>{b.CheckOut}</td>
                    <td>{b.Customer?.Name}</td>
                    <td>{matchedRoom?.Address}</td>
                    <td>{matchedRoom?.RoomTypes?.PricePerNight}</td>
                    <td>
                      <button onClick={() => handleConfirm(b.ID as number)}>
                        Confirm
                      </button>

                      <button
                        className="btn-delete-booking"
                        onClick={() => confirmCancalBooking(b, b.RoomID as number)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
            <h2>Order</h2>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Menu Image</th>
                  <th>Menu</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Booking ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.map((o) => (
                  <tr key={o.ID}>
                    <td>{o.ID}</td>
                    <td>
                      <img
                        className="payment-menu-image"
                        src={o.Menu?.ImageMenu}
                        alt=""
                      />
                    </td>
                    <td>{o.Menu?.MenuList}</td>
                    <td>{o.Amount}</td>
                    <td>{o.Price.toFixed(2)}</td>
                    <td>{o.BookingID}</td>
                    <td>
                      <button
                        className="btn-delete-order"
                        onClick={() => confirmCancalOrder(o.ID as number)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment;
