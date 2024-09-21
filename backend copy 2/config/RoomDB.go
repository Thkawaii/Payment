package config

import (
	"fmt"
	"project-sa67/entity/room"
	"time"
)

func SetupRoomDatabase() {
	db.AutoMigrate(
		&entity.Booking{},
		&entity.Customer{},
		&entity.Room{},

		&entity.RoomTypes{},
	)

	// Seed RoomTypes
	// RoomTypesSingle := entity.RoomTypes{
	// 	Name:          "Single",
	// 	PricePerNight: 100,
	// 	Description:   "ห้องเตียงเดี่ยว"}
	// RoomTypesDouble := entity.RoomTypes{
	// 	Name:          "Double",
	// 	PricePerNight: 200,
	// 	Description:   "ห้องเตียงคู่"}
	// RoomTypesTrible := entity.RoomTypes{
	// 	Name:          "Trible",
	// 	PricePerNight: 300,
	// 	Description:   "ห้อง 3 เตียง"}

	// db.FirstOrCreate(&RoomTypesSingle)
	// db.FirstOrCreate(&RoomTypesDouble)
	// db.FirstOrCreate(&RoomTypesTrible)

	// Seed RoomTypes
	singleRoom := entity.RoomTypes{Name: "Single", PricePerNight: 100, Description: "Single bed room"}
	doubleRoom := entity.RoomTypes{Name: "Double", PricePerNight: 150, Description: "Double bed room"}
	suiteRoom := entity.RoomTypes{Name: "Suite", PricePerNight: 250, Description: "Suite room with premium amenities"}

	db.FirstOrCreate(&singleRoom, &entity.RoomTypes{Name: "Single", PricePerNight: 100, Description: "Single bed room"})
	db.FirstOrCreate(&doubleRoom, &entity.RoomTypes{Name: "Double", PricePerNight: 150, Description: "Double bed room"})
	db.FirstOrCreate(&suiteRoom, &entity.RoomTypes{Name: "Suite", PricePerNight: 250, Description: "Suite room with premium amenities"})

	// Seed RoomRanks
	//standardRank := entity.RoomRank{Name: "Standard", NumberPerRank: 1, Description: "Standard rank room"}
	//deluxeRank := entity.RoomRank{Name: "Deluxe", NumberPerRank: 2, Description: "Deluxe rank room with better amenities"}

	//db.FirstOrCreate(&standardRank)
	//db.FirstOrCreate(&deluxeRank)

	// Seed RoomTypesRoomRank associations
	//roomTypeRoomRank1 := entity.RoomTypesRoomRank{RoomRankID: &standardRank.ID, RoomTypesID: &singleRoom.ID}
	//roomTypeRoomRank2 := entity.RoomTypesRoomRank{RoomRankID: &deluxeRank.ID, RoomTypesID: &suiteRoom.ID}

	//db.FirstOrCreate(&roomTypeRoomRank1)
	//db.FirstOrCreate(&roomTypeRoomRank2)

	// Seed Rooms
	room101 := entity.Room{Address: "101", RoomTypesID: &singleRoom.ID}
	room102 := entity.Room{Address: "102", RoomTypesID: &singleRoom.ID}
	room103 := entity.Room{Address: "103", RoomTypesID: &singleRoom.ID}
	room104 := entity.Room{Address: "104", RoomTypesID: &singleRoom.ID}
	room105 := entity.Room{Address: "105", RoomTypesID: &singleRoom.ID}
	room106 := entity.Room{Address: "106", RoomTypesID: &singleRoom.ID}
	room107 := entity.Room{Address: "107", RoomTypesID: &singleRoom.ID}
	room108 := entity.Room{Address: "108", RoomTypesID: &singleRoom.ID}
	room109 := entity.Room{Address: "109", RoomTypesID: &singleRoom.ID}
	room110 := entity.Room{Address: "110", RoomTypesID: &singleRoom.ID}

	room201 := entity.Room{Address: "201", RoomTypesID: &doubleRoom.ID}
	room202 := entity.Room{Address: "202", RoomTypesID: &doubleRoom.ID}
	room203 := entity.Room{Address: "203", RoomTypesID: &doubleRoom.ID}
	room204 := entity.Room{Address: "204", RoomTypesID: &doubleRoom.ID}
	room205 := entity.Room{Address: "205", RoomTypesID: &doubleRoom.ID}
	room206 := entity.Room{Address: "206", RoomTypesID: &doubleRoom.ID}
	room207 := entity.Room{Address: "207", RoomTypesID: &doubleRoom.ID}
	room208 := entity.Room{Address: "208", RoomTypesID: &doubleRoom.ID}
	room209 := entity.Room{Address: "209", RoomTypesID: &doubleRoom.ID}
	room210 := entity.Room{Address: "210", RoomTypesID: &doubleRoom.ID}

	room301 := entity.Room{Address: "301", RoomTypesID: &suiteRoom.ID}
	room302 := entity.Room{Address: "302", RoomTypesID: &suiteRoom.ID}
	room303 := entity.Room{Address: "303", RoomTypesID: &suiteRoom.ID}
	room304 := entity.Room{Address: "304", RoomTypesID: &suiteRoom.ID}
	room305 := entity.Room{Address: "305", RoomTypesID: &suiteRoom.ID}
	room306 := entity.Room{Address: "306", RoomTypesID: &suiteRoom.ID}
	room307 := entity.Room{Address: "307", RoomTypesID: &suiteRoom.ID}
	room308 := entity.Room{Address: "308", RoomTypesID: &suiteRoom.ID}
	room309 := entity.Room{Address: "309", RoomTypesID: &suiteRoom.ID}
	room310 := entity.Room{Address: "310", RoomTypesID: &suiteRoom.ID}

	db.Create(&room101)
	db.Create(&room102)
	db.Create(&room103)
	db.Create(&room104)
	db.Create(&room105)
	db.Create(&room106)
	db.Create(&room107)
	db.Create(&room108)
	db.Create(&room109)
	db.Create(&room110)

	db.Create(&room201)
	db.Create(&room202)
	db.Create(&room203)
	db.Create(&room204)
	db.Create(&room205)
	db.Create(&room206)
	db.Create(&room207)
	db.Create(&room208)
	db.Create(&room209)
	db.Create(&room210)

	db.Create(&room301)
	db.Create(&room302)
	db.Create(&room303)
	db.Create(&room304)
	db.Create(&room305)
	db.Create(&room306)
	db.Create(&room307)
	db.Create(&room308)
	db.Create(&room309)
	db.Create(&room310)

	// Seed Customers
	customer1 := entity.Customer{Name: "John Doe", Address: "123 Main St", PhoneNumber: "555-1234", Email: "johndoe@example.com"}
	customer2 := entity.Customer{Name: "Jane Doe", Address: "456 Main St", PhoneNumber: "555-5678", Email: "janedoe@example.com"}

	db.FirstOrCreate(&customer1)
	db.FirstOrCreate(&customer2)

	// Seed Bookings
	booking1 := entity.Booking{CheckIn: time.Now(), CustomerID: &customer1.ID, RoomID: &room101.ID}
	booking2 := entity.Booking{CheckIn: time.Now(), CustomerID: &customer2.ID, RoomID: &room201.ID}

	db.Create(&booking1)
	db.Create(&booking2)

	fmt.Println("ROOM data has been added to the database.")
}
