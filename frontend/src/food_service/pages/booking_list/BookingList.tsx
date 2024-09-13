import React, { useState, useEffect } from 'react';
import { Col, Divider } from 'antd';
import { CIcon } from '@coreui/icons-react';
import { cilRoom } from '@coreui/icons';
import { useNavigate } from 'react-router-dom'; // <-- Add this
import { BookingInterface } from '../../interfaces/IBooking';
import { GetBookings } from '../../services/https/BookingAPI';
import './index.css';

interface BookingProps {
  onBookingSelect: (id: number) => void;
}

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

const BookingList: React.FC<BookingProps> = ({ onBookingSelect }) => {
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const navigate = useNavigate(); // <-- Add this

  const fetchBooking = async () => {
    try {
      const response = await GetBookings();
      if (Array.isArray(response)) {
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
            .filter((book) => book.CheckOut === '0001-01-01T00:00:00Z')
            .map((book) => (
              <div
                key={book.ID}
                className="booking-item-crad"
                onClick={() => {
                  if (book.ID !== undefined) {
                    onBookingSelect(book.ID);
                    navigate(`/structure/${book.ID}`); // <-- Navigate to Structure with bookingID
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
                      <h2>Room Type</h2>
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
                    <CIcon icon={cilRoom} style={{ height: '30px', color: 'white' }} />
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
