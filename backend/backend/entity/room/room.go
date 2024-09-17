package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Status  string `gorm:"default:Guest"`
	Address string

	// 1 creator เป็นเจ้าของได้หลาย Sound
	Bookings []Booking `gorm:"foreignKey:RoomID"`

	RoomTypesID *uint
	RoomTypes   RoomTypes `gorm:"foreignKey:RoomTypesID"`
}
