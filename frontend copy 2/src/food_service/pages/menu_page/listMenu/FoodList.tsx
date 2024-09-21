import { useState, useEffect } from 'react';
import { message } from 'antd';
// import { MenuInterface } from '../../../interfaces/IMenu';
import { GetMenus } from '../../../services/https/MenuAPI';
import { CreateOrder } from '../../../services/https/OrderAPI';
import { OrderInterface } from '../../../interfaces/IOrder';
import FoodItem from './FoodItem';
import Form from '../form/Form';
import './index.css';
// import Item from 'antd/es/list/Item';

// type Category = 'breakfast' | 'lunch' | 'dinner';

export interface ItemInterface {
  ID: number;
  MenuList: string;
  Price: number;
  Description: string; 
  ImageMenu: string;
  MealID: number;
  FoodCategoryID: number;
  amount: number;
}

function FoodList({ selectedCategory, bookingID }: { selectedCategory: string | null | undefined, bookingID: number | null }) {
  const [toggledItems, setToggledItems] = useState<Record<string, boolean>>({});
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [selectedItems, setSelectedItems] = useState<ItemInterface[]>([]);
  const [menuItems, setMenuItems] = useState<ItemInterface[]>([]);
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
  

  const handleToggle = (food: ItemInterface) => {
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
      messageApi.open({
        type: 'error',
        content: 'No booking ID available!',
      });
      return;
    }
  
    try {
      // รวบรวมรายการที่ต้องการสร้าง
      const orderPromises = selectedItems.map(item => {
        const orderData: OrderInterface = {
          BookingID: bookingID,
          MenuID: item.ID,
          Amount: item.amount,
          Price: item.Price * item.amount,
          OrderDate: new Date(),
        };
         
        return CreateOrder(orderData), console.log('Created Order:', orderData); // สร้างออเดอร์
      });
  
      // รอผลลัพธ์จากการสร้างออเดอร์ทั้งหมด
      const createdOrders = await Promise.all(orderPromises);
  
      // ตรวจสอบผลลัพธ์ของการสร้างออเดอร์
      const allSuccess = createdOrders.every(order => order !== null); // ตรวจสอบว่าทุกออเดอร์สำเร็จหรือไม่
  
      if (allSuccess) {
        // ถ้าสำเร็จทุกออเดอร์ แสดงข้อความ success
        messageApi.open({
          type: 'success',
          content: 'Order placed successfully!',
        });
        handleClearSelection(); // เคลียร์รายการหลังจากส่งข้อมูลสำเร็จ
      } else {
        // ถ้ามีบางออเดอร์ล้มเหลว แสดงข้อความ error
        messageApi.open({
          type: 'error',
          content: 'Some orders failed to be placed!',
        });
      }
    } catch (error) {
      // กรณีเกิดข้อผิดพลาดในการดำเนินการ แสดงข้อความ error
      messageApi.open({
        type: 'error',
        content: 'Order placement failed!',
      });
      console.error('Error submitting order:', error);
    }
  };
  
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

  console.log("Selected Category:", selectedCategory);

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