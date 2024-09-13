import React, { useState } from 'react';
import qrCode from '../payment/assets/qr-code.png'; // รูป QR Code สำหรับการชำระเงิน
// import './Payment.css'; 

const Receipt: React.FC = () => {
  const [showReceipt, setShowReceipt] = useState(false); // สถานะการแสดงสลิปชำระเงิน

  // ฟังก์ชั่นสำหรับการแสดงสลิปชำระเงิน
  const handlePayment = () => {
    // จำลองการชำระเงิน
    setShowReceipt(true); // เมื่อชำระเงินเสร็จจะให้แสดงสลิป
  };

  // ฟังก์ชั่นสำหรับปิดหน้าสลิปชำระเงิน
  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <div className="payment-container">
      <h1>ชำระเงิน</h1>

      {!showReceipt ? (
        <div className="qr-section">
          <p>กรุณาสแกน QR Code เพื่อชำระเงิน</p>
          <img src={qrCode} alt="QR Code" className="qr-code" />
          <button onClick={handlePayment} className="pay-button">ชำระเงิน</button>
        </div>
      ) : (
        <div className="receipt-section">
          <h2>สลิปการชำระเงิน</h2>
          <div className="receipt-details">
            <p>รหัสการชำระเงิน: 123456</p>
            <p>จำนวนเงินที่ชำระ: 1,500 บาท</p>
            <p>วันที่: 12 กันยายน 2024</p>
          </div>
          <button onClick={handleCloseReceipt} className="close-button">ปิด</button>
        </div>
      )}
    </div>
  );
};

export default Receipt;
