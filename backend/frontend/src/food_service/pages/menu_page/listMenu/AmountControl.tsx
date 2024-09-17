import React from 'react';
import './index.css';

interface AmountControlProps {
  amount: number;
  onAmountChange: (delta: number) => void;
}

const AmountControl: React.FC<AmountControlProps> = ({ amount, onAmountChange }) => {
  return (
    <div className='amount-control-frame'>
      <button className='minus-button' onClick={() => onAmountChange(-1)}> - </button>
      <input className='amount' name="amount" value={amount} readOnly />
      <button className='plus-button' onClick={() => onAmountChange(1)}> + </button>
    </div>
  );
}

export default AmountControl;
