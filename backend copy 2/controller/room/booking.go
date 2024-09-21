package room

import (
	"net/http"
	"project-sa67/config"
	"project-sa67/entity/room"
	"project-sa67/entity/food_service"
	"github.com/gin-gonic/gin"
)

// POST /bookings
func CreateBooking(c *gin.Context) {
	var booking entity.Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": booking})
}

// GET /bookings/:id
func GetBooking(c *gin.Context) {
	var booking entity.Booking
	id := c.Param("id")

	db := config.DB()
	results := db.Preload("Customer").Preload("Room").Find(&booking, id)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, booking)
}

// GET /bookings
func ListBookings(c *gin.Context) {
	var bookings []entity.Booking

	db := config.DB()
	results := db.Preload("Customer").Preload("Room").Find(&bookings)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, bookings)
}

// DELETE /bookings/:id
func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// Find the booking
	var booking entity.Booking
	if tx := db.First(&booking, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// Soft delete the related orders
	db.Model(&food_service.Order{}).Where("booking_id = ?", id).Delete(&food_service.Order{})

	// Soft delete the booking itself
	if tx := db.Delete(&booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete booking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}


// PATCH /bookings/:id
func UpdateBooking(c *gin.Context) {
	var booking entity.Booking
	id := c.Param("id")

	if err := config.DB().First(&booking, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": booking})
}
