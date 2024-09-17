package room

import (
	"net/http"
	"project-sa67/entity/room"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /rooms
func CreateRoom(c *gin.Context) {
	var room entity.Room
	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": room})
}

// GET /rooms/:id
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")

	db := config.DB()
	results := db.Preload("Bookings").Preload("RoomTypes").Find(&room, id)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, room)
}

// GET /rooms
func ListRooms(c *gin.Context) {
	var rooms []entity.Room

	db := config.DB()
	results := db.Preload("Bookings").Preload("RoomTypes").Find(&rooms)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, rooms)
}

// DELETE /rooms/:id
func DeleteRoom(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Room{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /rooms/:id
func UpdateRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")

	if err := config.DB().First(&room, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room})
}
