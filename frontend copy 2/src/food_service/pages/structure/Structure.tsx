import { useState } from 'react';
import MealButtons from '../menu_page/MealButtons';
import FoodList from '../menu_page/listMenu/FoodList';
import { MealInterface } from '../../interfaces/IMeal'; // Import MealInterface for type checking
import './index.css';
import { useLocation } from 'react-router-dom';

// interface StructurecopyProps {
//   bookingID: number | null;
// }

// Example meal data
const breakfastCategory: MealInterface = {
  ID: 1,   // Assuming breakfast has ID 1
  Name: 'breakfast',
};

const Structure: React.FC = () => {
  // Set default category to breakfast
  const [selectedCategory, setSelectedCategory] = useState<MealInterface | null>(breakfastCategory);
  const location = useLocation(); // <-- Use useLocation to get state
  const { bookingID } = location.state || {}; // <-- Extract bookingID from state

  const handleCategoryClick = (category: MealInterface | null) => {
    setSelectedCategory(category); // Set the full MealInterface object as selected category
  };

  console.log('Selected category: ', selectedCategory);
  console.log('Booking ID: ', bookingID);

  return (
    <>
      <div className='layout'>
        <div className='space'>
          <MealButtons 
            selectedCategory={selectedCategory} 
            onCategoryClick={handleCategoryClick} 
          />
        </div>   

        <div className='content'>
          {selectedCategory ? (
            <FoodList 
              selectedCategory={selectedCategory.Name} // Passing the category name as string to FoodList
              bookingID={bookingID} 
            />
          ) : null}
        </div>
        {/* <button className='back-button'>
          back
        </button> */}
      </div>
    </>
  );
};

export default Structure;
