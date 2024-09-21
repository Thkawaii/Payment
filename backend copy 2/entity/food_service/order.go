package food_service

import (
	"time"
	"project-sa67/entity/room"
	"gorm.io/gorm"
 )
 
 type Order struct {
	gorm.Model
	OrderDate 	time.Time
	Amount		int
	Price 		float32 

	// MenuID ทำหน้าที่เป็น FK
	MenuID 		uint
	Menu   		*Menu  			`gorm:"foreignKey:MenuID;constraint:OnDelete:CASCADE;"`

	// BookingID ทำหน้าที่เป็น FK
	BookingID	uint
	Booking   	*entity.Booking	`gorm:"foreignKey:BookingID;constraint:OnDelete:CASCADE;"`

 }