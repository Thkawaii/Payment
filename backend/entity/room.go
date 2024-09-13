package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Status     string
	Address    string
	TotalPrice int

	// 1 creator เป็นเจ้าของได้หลาย Sound
	Bookings []Booking `gorm:"foreignKey:RoomID"`

	RoomTypesID *uint
	RoomTypes   RoomTypes `gorm:"foreignKey:RoomTypesID"`
}
