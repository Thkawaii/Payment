package entity

import "gorm.io/gorm"

type RoomTypes struct {
	gorm.Model
	Name          string
	PricePerNight float32
	Description   string
	// 1 creator เป็นเจ้าของได้หลาย Sound
	Rooms []Room `gorm:"foreignKey:RoomTypesID"`
	//RoomTypes_RoomRanks []RoomTypesRoomRank `gorm:"foreignKey:RoomTypesID"`
}
