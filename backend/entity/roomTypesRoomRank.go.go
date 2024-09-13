package entity

import (
	"gorm.io/gorm"
)

type RoomTypesRoomRank struct {
	gorm.Model

	// CreatorID ทำหน้าที่เป็น FK
	RoomRankID *uint
	RoomRank   RoomRank `gorm:"foreignKey:RoomRankID"`

	// CreatorID ทำหน้าที่เป็น FK
	RoomTypesID *uint
	RoomTypes   RoomTypes `gorm:"foreignKey:RoomTypesID"`
}
