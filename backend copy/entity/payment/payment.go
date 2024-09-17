package entity
	import (
	"gorm.io/gorm"
	"project-sa67/entity/room"
	"time"
)

type Payment struct {
	gorm.Model
	PaymentDate 	time.Time 		`gorm:"not null"`
	TotalAmount 	float32			`gorm:"not null"`
	PaymentMethod 	string 			`gorm:"not null"`
	
	BookingID 		int 			`gorm:"index;not null"` // Foreign key
	Booking 		entity.Booking 	`gorm:"foreignKey:BookingID"` // Association
}