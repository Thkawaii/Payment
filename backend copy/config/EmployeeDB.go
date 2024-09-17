package config

import (
	"fmt"
	"project-sa67/entity/employee"
	"time"
)

func SetupEmployeeDatabase() {
	db.AutoMigrate(
		&entity.Employee{},
		&entity.Position{},
	)

	// Ensure Position "Kitchen" exists
	PositionKitchen := entity.Position{Position_Name: "Kitchen"}
	PositionHousekepper := entity.Position{Position_Name: "Housekepper"}
	PositionFrontOffice := entity.Position{Position_Name: "FrontOffice"}
	PositionManagement := entity.Position{Position_Name: "Management"}
	PositionMaintenance := entity.Position{Position_Name: "Maintenance"}

	db.FirstOrCreate(&PositionKitchen, entity.Position{Position_Name: "Kitchen"})
	db.FirstOrCreate(&PositionHousekepper, entity.Position{Position_Name: "Housekeeping"})
	db.FirstOrCreate(&PositionFrontOffice, entity.Position{Position_Name: "FrontOffice"})
	db.FirstOrCreate(&PositionManagement, entity.Position{Position_Name: "Management"})
	db.FirstOrCreate(&PositionMaintenance, entity.Position{Position_Name: "Maintenance"})

	PositionID := uint(1)
	// Create Employee
	hashedPassword, _ := HashPassword("123")
	employee := &entity.Employee{
		FirstName:      "John",
		LastName:       "Doe",
		Email:          "sa@gmail.com",
		Password: 		hashedPassword,
		Gender:         "Male",
		Date_of_Birth:  time.Date(1990, time.July, 15, 0, 0, 0, 0, time.UTC),
		PositionID:     &PositionID, // Use the pointer to the ID
		Profile:        "https://people.com/thmb/whreakhSGQvaW5VWPZLXGtB0riU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(1079x278:1081x280)/bobi-worlds-oldest-dog-051223-1-cf1da82b429c43b8a9076e62ec24bc90.jpg",
	}
	db.FirstOrCreate(employee, &entity.Employee{
		Email: "sa@gmail.com",
	})

	fmt.Println("EMPLOYEE data has been added to the database.")
}