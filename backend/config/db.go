package config

import (
	"fmt"
	"project-sa67/entity"
	"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
   return db
}


func ConnectionDB() {
   database, err := gorm.Open(sqlite.Open("projectsa.db?cache=shared"), &gorm.Config{})
   if err != nil {
       panic("failed to connect database")
   }
   fmt.Println("connected database")
   db = database
}


func SetupDatabase() {
    // AutoMigrate all entities
	db.AutoMigrate(
		&entity.Booking{},
		&entity.Customer{},
		&entity.FoodCategory{},
		&entity.Meal{},
		&entity.Menu{},
		&entity.Order{},
		&entity.Room{},
		&entity.RoomRank{},
		&entity.RoomTypes{},
		&entity.RoomTypesRoomRank{},
        &entity.Payment{},
	)

    // Add Food Categories
    foodCategory := entity.FoodCategory{Name: "Food"}
    drinkCategory := entity.FoodCategory{Name: "Drink"}

    db.FirstOrCreate(&foodCategory, &entity.FoodCategory{Name: "Food"})
    db.FirstOrCreate(&drinkCategory, &entity.FoodCategory{Name: "Drink"})

    // Add Meals
    breakfast := entity.Meal{Name: "Breakfast"}
    lunch := entity.Meal{Name: "Lunch"}
    dinner := entity.Meal{Name: "Dinner"}

    db.FirstOrCreate(&breakfast, &entity.Meal{Name: "Breakfast"})
    db.FirstOrCreate(&lunch, &entity.Meal{Name: "Lunch"})
    db.FirstOrCreate(&dinner, &entity.Meal{Name: "Dinner"})

    // Add Menus for Food
    foodItems := []struct {
        name        	string
        price       	float32
        description 	string
        meal_id      	uint
        food_category_id uint
    }{
        {"Eggs Benedict Breakfast", 6.99, "Classic eggs benedict with hollandaise sauce", breakfast.ID, foodCategory.ID},
        {"French Toast Breakfast", 5.49, "Thick slices of French toast with syrup", breakfast.ID, foodCategory.ID},
        {"Pancakes Breakfast", 5.99, "Fluffy pancakes served with butter and syrup", breakfast.ID, foodCategory.ID},
        {"Omelette Breakfast", 7.49, "Cheese omelette with your choice of fillings", breakfast.ID, foodCategory.ID},
        {"Breakfast Burrito Breakfast", 8.99, "Burrito filled with eggs, cheese, and sausage", breakfast.ID, foodCategory.ID},
        {"Chicken Salad Lunch", 7.99, "Grilled chicken salad with mixed greens", lunch.ID, foodCategory.ID},
        {"Cheeseburger Lunch", 8.49, "Juicy cheeseburger with fries", lunch.ID, foodCategory.ID},
        {"Caesar Salad Lunch", 6.49, "Caesar salad with chicken or shrimp", lunch.ID, foodCategory.ID},
        {"Club Sandwich Lunch", 8.99, "Classic club sandwich with turkey and bacon", lunch.ID, foodCategory.ID},
        {"Spaghetti Bolognese Lunch", 9.49, "Spaghetti with a rich meat sauce", lunch.ID, foodCategory.ID},
        {"Margherita Pizza Dinner", 10.99, "Pizza with fresh tomatoes, mozzarella, and basil", dinner.ID, foodCategory.ID},
        {"Grilled Steak Dinner", 15.99, "Tender steak grilled to perfection", dinner.ID, foodCategory.ID},
        {"Salmon Fillet Dinner", 14.99, "Grilled salmon fillet with a lemon dill sauce", dinner.ID, foodCategory.ID},
        {"Chicken Alfredo Dinner", 12.99, "Creamy Alfredo pasta with grilled chicken", dinner.ID, foodCategory.ID},
        {"Vegetable Stir Fry Dinner", 11.49, "Stir-fried vegetables with tofu", dinner.ID, foodCategory.ID},
        {"Iced Coffee Breakfast", 3.49, "Chilled coffee with ice", breakfast.ID, drinkCategory.ID},
        {"Orange Juice Breakfast", 2.99, "Freshly squeezed orange juice", breakfast.ID, drinkCategory.ID},
        {"Herbal Tea Lunch", 2.49, "Refreshing herbal tea", lunch.ID, drinkCategory.ID},
        {"Lemonade Lunch", 3.49, "Chilled lemonade with a hint of mint", lunch.ID, drinkCategory.ID},
        {"Soft Drink Lunch", 1.99, "Assorted soft drinks", lunch.ID, drinkCategory.ID},
        {"Hot Chocolate Dinner", 4.49, "Rich hot chocolate with whipped cream", dinner.ID, drinkCategory.ID},
        {"Red Wine Dinner", 5.99, "Glass of red wine to complement your meal", dinner.ID, drinkCategory.ID},
        {"Craft Beer Dinner", 4.99, "Selection of craft beers", dinner.ID, drinkCategory.ID},
        {"Green Tea Dinner", 2.49, "Calming green tea", dinner.ID, drinkCategory.ID},
        {"Milkshake Breakfast", 3.99, "Thick milkshake with vanilla or chocolate flavor", breakfast.ID, drinkCategory.ID},
        {"Cappuccino Breakfast", 4.49, "Rich cappuccino with frothy milk", breakfast.ID, drinkCategory.ID},
        {"Berry Smoothie Lunch", 5.49, "Smoothie with mixed berries and yogurt", lunch.ID, drinkCategory.ID},
        {"Mango Lassi Lunch", 4.99, "Indian mango yogurt drink", lunch.ID, drinkCategory.ID},
        {"Peach Iced Tea Dinner", 3.99, "Iced tea with a hint of peach", dinner.ID, drinkCategory.ID},
        {"Ginger Ale Dinner", 2.99, "Ginger ale to refresh your palate", dinner.ID, drinkCategory.ID},
        {"Strawberry Lemonade Dinner", 3.49, "Lemonade with fresh strawberries", dinner.ID, drinkCategory.ID},
        {"Chocolate Milkshake Dinner", 4.49, "Chocolate-flavored milkshake", dinner.ID, drinkCategory.ID},
        {"Iced Matcha Latte Breakfast", 4.99, "Iced matcha latte with almond milk", breakfast.ID, drinkCategory.ID},
        {"Mocha Coffee Lunch", 4.49, "Coffee with chocolate syrup", lunch.ID, drinkCategory.ID},
        {"Chai Latte Dinner", 4.99, "Spiced chai latte with steamed milk", dinner.ID, drinkCategory.ID},
        {"Pineapple Juice Lunch", 3.49, "Fresh pineapple juice", lunch.ID, drinkCategory.ID},
        {"Cold Brew Coffee Dinner", 4.49, "Smooth cold brew coffee", dinner.ID, drinkCategory.ID},
    }

    for _, item := range foodItems {
        menu := entity.Menu{
            MenuList:       item.name,
            Price:          item.price,
            Description:    item.description,
            MealID:         item.meal_id,
            FoodCategoryID: item.food_category_id,
        }
        db.Create(&menu)
    }

    // Seed RoomTypes
	singleRoom := entity.RoomTypes{Name: "Single", PricePerNight: 100, HowLongTime: 24, PaymentMethod: "Credit", Description: "Single bed room"}
	doubleRoom := entity.RoomTypes{Name: "Double", PricePerNight: 150, HowLongTime: 24, PaymentMethod: "Credit", Description: "Double bed room"}
	suiteRoom := entity.RoomTypes{Name: "Suite", PricePerNight: 250, HowLongTime: 24, PaymentMethod: "Credit", Description: "Suite room with premium amenities"}

	db.FirstOrCreate(&singleRoom)
	db.FirstOrCreate(&doubleRoom)
	db.FirstOrCreate(&suiteRoom)

	// Seed RoomRanks
	standardRank := entity.RoomRank{Name: "Standard", NumberPerRank: 1, Description: "Standard rank room"}
	deluxeRank := entity.RoomRank{Name: "Deluxe", NumberPerRank: 2, Description: "Deluxe rank room with better amenities"}

	db.FirstOrCreate(&standardRank)
	db.FirstOrCreate(&deluxeRank)

	// Seed RoomTypesRoomRank associations
	roomTypeRoomRank1 := entity.RoomTypesRoomRank{RoomRankID: &standardRank.ID, RoomTypesID: &singleRoom.ID}
	roomTypeRoomRank2 := entity.RoomTypesRoomRank{RoomRankID: &deluxeRank.ID, RoomTypesID: &suiteRoom.ID}

	db.FirstOrCreate(&roomTypeRoomRank1)
	db.FirstOrCreate(&roomTypeRoomRank2)

	// Seed Rooms
	room1 := entity.Room{Status: "Available", Address: "101A", TotalPrice: 100, RoomTypesID: &singleRoom.ID}
	room2 := entity.Room{Status: "Booked", Address: "102A", TotalPrice: 150, RoomTypesID: &doubleRoom.ID}
	room3 := entity.Room{Status: "Available", Address: "201A", TotalPrice: 250, RoomTypesID: &suiteRoom.ID}

	db.Create(&room1)
	db.Create(&room2)
	db.Create(&room3)

	// Seed Customers
	customer1 := entity.Customer{Name: "John Doe", Address: "123 Main St", PhoneNumber: "555-1234", Email: "johndoe@example.com", PaymentMethod: "Credit Card"}
	customer2 := entity.Customer{Name: "Jane Doe", Address: "456 Main St", PhoneNumber: "555-5678", Email: "janedoe@example.com", PaymentMethod: "Cash"}

	db.FirstOrCreate(&customer1)
	db.FirstOrCreate(&customer2)

	// Seed Bookings
	booking1 := entity.Booking{CheckIn: time.Now(), CustomerID: &customer1.ID, RoomID: &room1.ID}
	booking2 := entity.Booking{CheckIn: time.Now(), CustomerID: &customer2.ID, RoomID: &room2.ID}

	db.Create(&booking1)
	db.Create(&booking2)

	// Seed Menus (Example FoodCategory and Meals are skipped for brevity)
	menu1 := entity.Menu{MenuList: "Spaghetti", Price: 12.50, Description: "Delicious spaghetti with marinara sauce", MealID: 1, FoodCategoryID: 1}
	menu2 := entity.Menu{MenuList: "Chicken Salad", Price: 10.00, Description: "Grilled chicken with fresh salad", MealID: 2, FoodCategoryID: 2}

	db.Create(&menu1)
	db.Create(&menu2)

	// Seed Orders
	order1 := entity.Order{OrderDate: time.Now(), Amount: 2, Price: 25.00, MenuID: menu1.ID, BookingID: booking1.ID}
	order2 := entity.Order{OrderDate: time.Now(), Amount: 1, Price: 10.00, MenuID: menu2.ID, BookingID: booking2.ID}

	db.Create(&order1)
	db.Create(&order2)

    payment := entity.Payment{
        PaymentID:     1,
        BookingID:     123, // การเชื่อมโยงกับ BookingID ที่มีอยู่
        TotalAmount:   500,
        PaymentDate:   time.Now(),
        PaymentMethod: "Credit Card",
        Status:        "Pending",
    }
    db.Create(&payment)

	fmt.Println("Sample data has been added to the database.")
}