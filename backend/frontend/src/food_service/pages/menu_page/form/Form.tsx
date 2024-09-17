import React from 'react';
// import { MenuInterface } from '../../../interfaces/IMenu';
import { ItemInterface } from '../listMenu/FoodList';
import './index.css';

interface FormProps {
  onSubmit: () => void;
  selectedItems: ItemInterface[];
  onClearSelection: () => void;
  bookingID: number | null;  // Accept bookingID as a prop
}

const Form: React.FC<FormProps> = ({ onSubmit, selectedItems, onClearSelection }) => {
  const Total = selectedItems.reduce((acc, item) => acc + (item.amount * item.Price), 0).toFixed(2);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(); // No need to pass roomNumber and customerName
  };

  const handleClear = () => {
    onClearSelection(); // Clear selected items
  };

  return (
    <div className='form-page'>
      <form onSubmit={handleSubmit}>
        <div className='selected-header'>Selected Menu</div>

        <div className="cart-items">
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                {item.MenuList} - {item.amount} x {item.Price.toFixed(2)} ฿ = {(item.amount * item.Price).toFixed(2)} ฿
              </li>              
              ))}
            </ul>
          )}
        </div>

        <div className='button-footer'>
          {selectedItems.length > 0 && (
            <div className="total-amount">
              <h2>Total: {Total} ฿</h2>
              <button type="submit" className='submit-button'>SUBMIT</button>
            </div>
          )}
          <button type="button" className='clear-button' onClick={handleClear}>CLEAR</button>

          {/* {selectedItems.length > 0 && (
          )} */}
        </div>

      </form>
    </div>
  );
}

export default Form;

