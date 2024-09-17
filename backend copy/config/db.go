package config

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
   return db
}


func ConnectionDB() {
   database, err := gorm.Open(sqlite.Open("project-sa67.db?cache=shared"), &gorm.Config{})
   if err != nil {
       panic("failed to connect database")
   }
   fmt.Println("connected database")
   db = database
}


func SetupDatabase() {

	SetupRoomDatabase()
    SetupMeetingRoomDatabase()
	SetupFoodServiceDatabase()
	SetupEmployeeDatabase()
	SetupPaymentDatabase()

	fmt.Println("Sample data has been added to the database.")
}