package entity

import (
	"gorm.io/gorm"
)

type Position struct {
	gorm.Model
	Position_Name string

	// 1 Doctor เป็นเจ้าของได้หลาย Prescription
	Employee []Employee `gorm:"foreignKey:PositionID"`
}