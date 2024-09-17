package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	FirstName string
	LastName string
	Email string
	Password string
	Gender string
	Date_of_Birth  time.Time
	Profile   string `gorm:"type:longtext"`

	// PositionID ทำหน้าที่เป็น FK
	PositionID *uint
	Position   Position `gorm:"foriegnKey:PositionID"`
	
}