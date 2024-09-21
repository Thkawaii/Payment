package food_service

import (
	"gorm.io/gorm"
 )
 
 type Menu struct {
	gorm.Model
	MenuList 	string
	Price 		float32
	Description string
	ImageMenu   string `gorm:"type:longtext"`

	// MealID ทำหน้าที่เป็น FK
	MealID 		uint
	Meal   		*Meal  		`gorm:"foreignKey: MealID"`

	// FoodCategoryID ทำหน้าที่เป็น FK
	FoodCategoryID 		uint
	FoodCategory    	*FoodCategory  `gorm:"foreignKey: FoodCategoryID"`

	// 1 menu มีได้หลาย order
	Orders []Order `gorm:"foreignKey:MenuID;constraint:OnDelete:CASCADE;"`
 }