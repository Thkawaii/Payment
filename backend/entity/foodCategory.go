package entity

import (
	"gorm.io/gorm"
 )
 
 type FoodCategory struct {
	gorm.Model
	Name  string

	// 1 FoodCategory มีได้หลาย menu
	Menus []Menu `gorm:"foreignKey:FoodCategoryID"`
 }