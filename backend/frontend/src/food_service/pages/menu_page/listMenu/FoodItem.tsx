import React from 'react';
import AmountControl from './AmountControl';
import { MenuInterface } from '../../../interfaces/IMenu';
import './index.css';

interface FoodItemProps {
  food: MenuInterface;
  isToggled: boolean;
  amount: number;
  onToggle: () => void;
  onAmountChange: (delta: number) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, isToggled, amount, onToggle, onAmountChange }) => {

  // console.log("Imang Menu :", food.ImageMenu);
  return (
    <div className='food-item'>
      <button
        className={`round-buttons ${isToggled ? 'active' : ''}`}
        onClick={onToggle}
      >
        {/* Optional content for button */}
      </button>

      <img className='image-menu' src={food.ImageMenu} alt="" />

      <div className='menu-list'>
        <h1>{food.MenuList} - {food.Price.toFixed(2)} ฿</h1>
        <p>- {food.Description}</p>
        
      </div>
      {/* <p>- {food.description}</p> */}
      <AmountControl amount={amount} onAmountChange={onAmountChange} />
    </div>
  );
}

export default FoodItem;
