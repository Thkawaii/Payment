package entity

import "gorm.io/gorm"

type RoomRank struct {
	gorm.Model
	Name          string
	NumberPerRank int //จะเป็นตัวคูณจำนวนเงินขึ้นตามRank
	Description   string

	// 1 creator เป็นเจ้าของได้หลาย Sound
	RoomTypes_RoomRanks []RoomTypesRoomRank `gorm:"foreignKey:RoomRankID"`
}
