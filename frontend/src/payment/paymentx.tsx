import React, { useState } from 'react';
import bankLogo1 from './assets/kasikorn-logo.png';
import bankLogo2 from './assets/thaipanit-logo.png';
import bankLogo3 from './assets/promptpay-logo.png';
import Screenshot from './assets/qr-code.png';
import './App.css';
import { MdOutlinePayment } from "react-icons/md";

type BankDetail = {
    accountNumber?: string;
    accountHolder?: string;
    imageSrc?: string;
};

// Define the type for the details object with an index signature
interface Details {
    [key: string]: BankDetail;  // This index signature tells TypeScript any string key returns a BankDetail
}
interface Props {
    bankingDetails: BankDetail | null;
}

const BankingDetailsDisplay: React.FC<Props> = ({ bankingDetails }) => {
  // State to manage the visibility of the banking details
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle closing the banking details view
  const handleClose = () => {
    console.log('Close button clicked'); // This should appear in your browser's console when the button is clicked
    setIsVisible(false);
};


  // Only render the component if isVisible is true and bankingDetails is not null
  if (!isVisible || !bankingDetails) return null;
}
function Payment() {
    const services = [
        { id: 1, description: "Restaurant", price: 364.00 },
        { id: 2, description: "Spa", price: 220.14 },
        { id: 3, description: "Fitness", price: 1234.56 }
         ];
    const [activeTab, setActiveTab] = useState<string>('banking');
    const [bookingDetails, setBookingDetails] = useState([
        { reservationID: '1101', bookID: '201', roomID: '301', checkInDate: '2024-08-01', checkOutDate: '2024-08-05', totalAmount: '10000.00' },
        { reservationID: '102', bookID: '202', roomID: '302', checkInDate: '2024-08-02', checkOutDate: '2024-08-06', totalAmount: '8000.00' }
    ]);
    const [selectedStatus, setSelectedStatus] = useState('Confirmed');
    const [showReceipt, setShowReceipt] = useState(false);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    const [showDetails, setShowDetails] = useState(true);

    // Function to hide the banking details section
    const handleClose = () => {
        setShowDetails(false);
    };
    const handleCloseReceipt = () => {
        setShowReceipt(false);
    };
    const [bankingDetails, setBankingDetails] = useState<BankDetail | null>(null);
    
    const details: Details = {
        'Kasikorn': { accountNumber: '123-5535-35', accountHolder: 'Hotel&Excess' },
        'ThaiPanit': { accountNumber: '453-535-5345', accountHolder: 'Hotel Pre1' },
        'PromptPay': { accountNumber: '2334-55-355', accountHolder: 'Hotel Bar123' },
        'ScanQR': { imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg' }  // External link to the QR code
    };

    const handleBankButton = (type: string) => {
        if (type in details) {
            setBankingDetails(details[type]);
        } else {
            console.error('Bank type does not exist:', type);
        }
    };
    

    
    return (
        <div className="app-container">
            <header>
                <h1>Payment System</h1>
                 <MdOutlinePayment className="icon-style" />
            </header>
            <section className="payment-section">
                <h2>Booking</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Reservation ID</th>
                            <th>Book ID</th>
                            <th>Room ID</th>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingDetails.map((item, index) => (
                            <tr key={index}>
                                <td>{item.reservationID}</td>
                                <td>{item.bookID}</td>
                                <td>{item.roomID}</td>
                                <td>{item.checkInDate}</td>
                                <td>{item.checkOutDate}</td>
                                <td>{item.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={() => setSelectedStatus('Confirmed')}>Confirm</button>
                    <button onClick={() => setSelectedStatus('Pending')}>Pending</button>
                    <button onClick={() => setSelectedStatus('Cancelled')}>Cancel</button>
                    <button onClick={() => setShowReceipt(true)}>Show Receipt</button>
                </div>
                <div className="status-display">
                    Status: <span className={`${selectedStatus.toLowerCase()}`}>{selectedStatus}</span>
                </div>
                {showReceipt && (
                    <div className="receipt-section">
                        <h2>Receipt Details</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Customer:</td>
                                    <td>Johndev</td>
                                </tr>
                                <tr>
                                    <td>RoomID:</td>
                                    <td>210</td>
                                </tr>
                                <tr>
                                    <td>Receipt ID</td>
                                    <td>1001</td>
                                </tr>
                                <tr>
                                    <td>Booking Ref</td>
                                    <td>2001</td>
                                </tr>
                                <tr>
                                    <td>Total Amount</td>
                                    <td>$4500.00</td>
                                </tr>
                                <tr>
                                    <td>Issued</td>
                                    <td>01-Aug</td>
                                </tr>
                                <tr>
                                    <td>Due</td>
                                    <td>15-Aug</td>
                                </tr>
                                <tr>
                                    <td>Service Description</td>
                                    <td>Restaurant</td>
                                </tr>
                                <tr>
                                    <td>Service Price</td>
                                    <td>$999.00</td>
                                </tr>
                                <tr>
                                    <td>Total Payment</td>
                                    <td>$15,000</td>
                                </tr>
                                <tr>
                                    <td>Payment Method</td>
                                    <td>Bank Transfer</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="contact-info">
                            <p>Email: hotel@example.com</p>
                            <p>Phone: 0904562341</p>
                            <p>Address: 1234 Siam Street, Silom, BKK</p>
                        </div>
                        <button onClick={handleCloseReceipt}>Close</button>
                    </div>
                )}
                <div className="service-table">
      <h2>Services</h2>
      <table>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.description}</td>
              <td>${service.price.toFixed(2)}</td>
              <td>
                <button className="btn add">Add</button>
                <button className="btn update">Update</button>
                <button className="btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                
            </section>
            <div className="dd"></div>
            <section className="banking-section">
                <div className="payment-container"></div>
                <div className="banking-box">
                    <h2>Banking</h2>
                    <div className="cash-box">
                        <h2>Cash</h2>
                        <p className="contact-reception">----Contact the reception department----</p>
                    </div>
                    <div className="bank-logo" style={{ backgroundImage: `url(${bankLogo1})` }} onClick={() => handleBankButton('Kasikorn')}>
                        <img src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png" alt="Kasikorn Bank" />
                        <button>Kasikorn</button>
                    </div>
                    <div className="bank-logo" style={{ backgroundImage: `url(${bankLogo2})` }} onClick={() => handleBankButton('ThaiPanit')}>
                        <img src="https://www.a-p-electric.com/images/ready-template/crop-1611643734515.png" alt="Thai Panit Bank" />
                        <button>ThaiPanit</button>
                    </div>
                    <div className="bank-logo" style={{ backgroundImage: `url(${bankLogo3})` }} onClick={() => handleBankButton('PromptPay')}>
                        <img src="https://www.designil.com/wp-content/uploads/2020/04/prompt-pay-logo.png" alt="PromptPay" />
                        <button>PromptPay</button>
                    </div>
                    <div className="bank-logo" style={{ backgroundImage: `url(${Screenshot})` }} onClick={() => handleBankButton('ScanQR')}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" />
                        <button>Scan QR</button>
                    </div>
                </div>
                {bankingDetails && (
                    <div className="detail-display">
                         <div className="inner-frame">
                        {bankingDetails.imageSrc ? (
                            <img src={bankingDetails.imageSrc} alt="QR Code" />
                            
                        ) : (
                            
                            <div>
                                <p>Account Number: {bankingDetails.accountNumber}</p>
                                <p>Recipient Name: {bankingDetails.accountHolder}</p>
                            </div>
                        )}
                        <button className="close-button" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                )}
            </section>
            <footer>
                <p>Contact Info: Email: hotel@example.com | Phone: 0904562341</p>
            </footer>
        </div>
    );
}
export default Payment;