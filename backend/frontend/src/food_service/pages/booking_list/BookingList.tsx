import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom'; // <-- Add this
import { Col, Divider } from 'antd';
import { MdBedroomParent } from "react-icons/md";
import { BookingInterface } from '../../../room/booking/interfaces/IBooking';
import { GetBookings } from '../../../room/booking/services/https';
import './index.css';

// interface BookingProps {
//   onBookingSelect: (id: number) => void;
// }

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const BookingList: React.FC = () => {
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const navigate = useNavigate(); // <-- Add this
  const location = useLocation();


  const fetchBooking = async () => {
    try {
      const response = await GetBookings();
      if (Array.isArray(response)) {
        console.log("GetBookings for Food: ", response)
        setBooking(response);
      } else {
        setBooking([]);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <>
      <div className="booking-page">
        <Col>
          <h2 className="booking-header">Booking List</h2>
        </Col>
        <Divider />
        <div className="booking-list-page">
          {booking
            .filter((book) => book.Room?.Status === 'Occupied')
            .map((book) => (
              <div
                key={book.ID}
                className="booking-item-crad"
                onClick={() => {
                  if (book.ID !== undefined) {
                    // onBookingSelect(book.ID);
                    navigate(`${location.pathname}/structure/${book.ID}`, { state: {bookingID: book.ID} });
                  }
                }}
              >
                <div className="cardWrap">
                  <div className="card cardLeft">
                    <h1>Booking {book.ID}</h1>
                    <div className="title">
                      <h2>Name</h2>
                      <span>{book.Customer?.Name}</span>
                    </div>
                    <div className="name">
                      <h2>Room Status</h2>
                      <span>{book.Room?.Status}</span>
                    </div>
                    <div className="seat">
                      <h2>{book.Room?.Address}</h2>
                      <span>number</span>
                    </div>
                    <div className="time">
                      <h2>{formatDate(book.CheckIn)}</h2>
                      <span>Check In</span>
                    </div>
                  </div>
                  <div className="card cardRight">
                    <MdBedroomParent  style={{marginTop: "-5px",width: "40px", height: "40px", color: 'white' }} />
                    <div className="number">
                      <h3>{book.Room?.Address}</h3>
                      <span>number</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default BookingList;
