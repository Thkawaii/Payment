package entity

import (
	"gorm.io/gorm"
)

type CustomerMeetingRoom struct {
	gorm.Model
	// CustomerId  uint `gorm:"primaryKey"`
	First_Name string
	Last_Name string
	Tel string
	Email string
	MeetingRooms []MeetingRoom `gorm:"many2many:ManageRoom;"`
}

