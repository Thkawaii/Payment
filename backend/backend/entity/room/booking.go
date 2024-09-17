package entity

import (
	"gorm.io/gorm"
	"time"
)

type Booking struct {
	gorm.Model
	CheckIn  time.Time
	CheckOut time.Time

	// CreatorID ทำหน้าที่เป็น FK
	CustomerID *uint
	Customer   Customer `gorm:"foreignKey:CustomerID"`

	// CreatorID ทำหน้าที่เป็น FK
	RoomID *uint
	Room   Room `gorm:"foreignKey:RoomID"`

	// 1 sound เป็นเจ้าของได้หลาย SoundPlaylists
	//Bookings []Booking `gorm:"foreignKey:SoundID"`
}
