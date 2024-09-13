package entity

import (
	"gorm.io/gorm"
 )
 
 type Meal struct {
	gorm.Model
	Name string

	// 1 meal มีได้หลาย menu
	Menus []Menu `gorm:"foreignKey:MealID"`
 }