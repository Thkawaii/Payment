package entity

import (
	"time"

	"gorm.io/gorm"
)

type ManageRoom struct{
	gorm.Model
	ID uint `gorm:"primaryKey"`
	DateTime time.Time
	StartTime time.Time
	EndTime time.Time
	TotalPeople int
	CustomerID    uint       // Foreign key to Customer
	Customer      CustomerMeetingRoom   `gorm:"foreignKey:CustomerID"` // Reference to the Customer entity
	
	MeetingRoomID uint       // Foreign key to MeetingRoom
	MeetingRoom   MeetingRoom `gorm:"foreignKey:MeetingRoomID"`
}


