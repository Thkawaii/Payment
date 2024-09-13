import { useState, useEffect } from 'react';
import { message } from 'antd';
// import { MenuInterface } from '../../../interfaces/IMenu';
import { GetMenus } from '../../../services/https/MenuAPI';
import { CreateOrder } from '../../../services/https/OrderAPI';
import { OrderInterface } from '../../../interfaces/IOrder';
import FoodItem from './FoodItem';
import Form from '../form/Form';
import './index.css';

// type Category = 'breakfast' | 'lunch' | 'dinner';

interface Item {
  ID: number;
  MenuList: string;
  Price: number;
  Description?: string; 
  MealID?: number;
  FoodCategoryID?: number;
  amount: number;
}

function FoodList({ selectedCategory, bookingID }: { selectedCategory: string | null | undefined, bookingID: number | null }) {
  const [toggledItems, setToggledItems] = useState<Record<string, boolean>>({});
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await GetMenus();
        console.log("Fetched menu items:", response); // Log menu items
        if (response) {
          setMenuItems(response);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
  
    fetchMenuItems();
  }, []);
  

  const handleToggle = (food: Item) => {
    const currentAmount = amounts[food.MenuList] || 1;
    setToggledItems(prev => ({
      ...prev,
      [food.MenuList]: !prev[food.MenuList]
    }));
  
    setSelectedItems(prev => {
      if (toggledItems[food.MenuList]) {
        return prev.filter(item => item.MenuList !== food.MenuList);
      } else {
        return [...prev, { ...food, amount: currentAmount }];
      }
    });
  };

  const handleAmountChange = (foodName: string, delta: number) => {
    setAmounts(prev => ({
      ...prev,
      [foodName]: Math.max((prev[foodName] || 1) + delta, 1),
    }));

    setSelectedItems(prev =>
      prev.map(item =>
        item.MenuList === foodName ? { ...item, amount: Math.max((item.amount || 1) + delta, 1) } : item
      )
    );
  };

  const handleClearSelection = () => {
    setToggledItems({});
    setAmounts({});
    setSelectedItems([]);
  };

  const handleFormSubmit = async () => {
    if (!bookingID) {
      console.error('No booking ID available');
      return;
    }
  
    for (const item of selectedItems) {
      const orderData: OrderInterface = {
        BookingID: bookingID,
        MenuID: item.ID ,
        Amount: item.amount,
        Price: item.Price,
        OrderDate: new Date(),
      };
  
        // สร้าง order และเก็บผลลัพธ์
      const createdOrder = await CreateOrder(orderData);
  
        // แสดงข้อมูลที่ถูกสร้างใน console
      console.log('Created Order:', createdOrder);
     
      handleClearSelection(); // เคลียร์รายการหลังจากส่งข้อมูลสำเร็จ
      if (createdOrder) {
        // Display success message
        messageApi.open({
          type: "success",
          content: "Order placed successfully",
      });
      } else {
        messageApi.open({
          type: "error",
          content: "Order placement failed !",
        });
      }
    };
  }

  if (!selectedCategory) {
    return null;
  }

  const categoryMealIDMap: Record<string, number> = {
    breakfast: 1,
    lunch: 2,
    dinner: 3,
  };
  
  const filteredMenuItems = menuItems.filter(
    item => item.MealID === categoryMealIDMap[selectedCategory.toLowerCase()]
  );
  
  const foodItems = filteredMenuItems.filter(item => item.FoodCategoryID === 1);
  const drinkItems = filteredMenuItems.filter(item => item.FoodCategoryID === 2);
  
  console.log("Menu Items:", menuItems);
  console.log("Selected Category:", selectedCategory);
  console.log("Filtered Menu Items:", filteredMenuItems);
  console.log("Food Items:", foodItems);
  console.log("Drink Items:", drinkItems);

  return (
    <div className='menu-page'>
      {contextHolder}
      <div className={`list-menu-page`}>
        <div className="food-list">
          <h2>Food</h2>
          {foodItems.map(food => (
            <FoodItem
              key={food.ID}
              food={food}
              isToggled={toggledItems[food.MenuList] || false}
              amount={amounts[food.MenuList] || 1}
              onToggle={() => handleToggle(food)}
              onAmountChange={(delta) => handleAmountChange(food.MenuList, delta)}
            />
          ))}
          <hr />
          <h2>Drink</h2>
          {drinkItems.map(drink => (
            <FoodItem
              key={drink.ID}
              food={drink}
              isToggled={toggledItems[drink.MenuList] || false}
              amount={amounts[drink.MenuList] || 1}
              onToggle={() => handleToggle(drink)}
              onAmountChange={(delta) => handleAmountChange(drink.MenuList, delta)}
            />
          ))}
        </div>
      </div>
      <Form 
        onSubmit={handleFormSubmit} 
        selectedItems={selectedItems}
        onClearSelection={handleClearSelection} // ส่งฟังก์ชันเคลียร์ข้อมูลไปยัง Form
        bookingID={bookingID} // Pass bookingID to Form
      />
    </div>
  );
}

export default FoodList;