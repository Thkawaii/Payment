import { useState, useEffect } from 'react';
import { GetMeals } from '../../services/https/MealAPI';
import { MealInterface } from '../../interfaces/IMeal';
import './index.css';

// type Category = 'setup';

type MealButtonsProps = {
  selectedCategory: MealInterface | null;
  onCategoryClick: (category: MealInterface | null) => void;
};

function MealButtons({ selectedCategory, onCategoryClick }: MealButtonsProps) {
  const [meals, setMeals] = useState<MealInterface[]>([]);

  // UseEffect to fetch meals from API
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
        const response = await GetMeals();
        console.log("Fetched meal button data:", response);
        if (Array.isArray(response.data)) {
            setMeals(response.data);
        } else {
            console.error("Data fetched meal is not an array:", response);
            setMeals([]);
        }
    } catch (error) {
        console.error("Error fetching meal data:", error);
    }
  };

  return (
    <div className="button-container">
      <div className="left-buttons">
        {/* Map through meals fetched from API */}
        {meals.map((meal) => (
          <button
            key={meal.ID}
            className={selectedCategory?.ID === meal.ID ? 'active' : ''}
            onClick={() => onCategoryClick(meal)}
          >
            <h1>{meal.Name?.toUpperCase()}</h1>
          </button>
        ))}
      </div>
      {/* Uncomment if you want to include setup button */}
      {/* <div className="right-buttons">
        <button
          className={selectedCategory === 'setup' ? 'active' : ''}
          onClick={() => onCategoryClick(null)}
        >
          <h1>SETUP</h1>
        </button>
      </div> */}
    </div>
  );
}

export default MealButtons;
