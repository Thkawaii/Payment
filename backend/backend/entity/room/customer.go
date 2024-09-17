package entity

import "gorm.io/gorm"

type Customer struct {
	gorm.Model
	Name        string
	Address     string
	PhoneNumber string
	Email       string

	// 1 creator เป็นเจ้าของได้หลาย Sound
	Bookings []Booking `gorm:"foreignKey:CustomerID"`
}
