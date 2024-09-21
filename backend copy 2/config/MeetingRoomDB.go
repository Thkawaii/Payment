package config

import (
	"fmt"
	"project-sa67/entity/meeting_room"
)

func SetupMeetingRoomDatabase() {
	db.AutoMigrate(
		&entity.MeetingRoom{},
		&entity.CustomerMeetingRoom{},
		&entity.ManageRoom{},
	)

	room1 := &entity.MeetingRoom{
		RoomName:     "Conference Room A",
		Capacity:     20,
		Detail:       "A medium-sized conference room with a projector and whiteboard.",
		RoomSize:     50.5,
		AirCondition: 1,
		Chair:        20,
		Type:         "Conference",
	}
	db.FirstOrCreate(&room1, entity.MeetingRoom{
		RoomName: "Conference Room A", // condition to find the existing record
	})

	fmt.Println("MEETINGROOM data has been added to the database.")
}