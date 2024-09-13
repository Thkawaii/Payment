package controller

import (
	"net/http"
	"project-sa67/entity"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /room_types
func CreateRoomTypes(c *gin.Context) {
	var roomTypes entity.RoomTypes
	if err := c.ShouldBindJSON(&roomTypes); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&roomTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": roomTypes})
}

// GET /room_types/:id
func GetRoomTypes(c *gin.Context) {
	var roomTypes entity.RoomTypes
	id := c.Param("id")

	if err := config.DB().First(&roomTypes, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roomTypes})
}

// GET /room_types
func ListRoomTypes(c *gin.Context) {
	var roomTypes []entity.RoomTypes

	db := config.DB()
	results := db.Preload("RoomRanksRoomTypes").Find(&roomTypes)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, roomTypes)
}

// DELETE /room_types/:id
func DeleteRoomTypes(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.RoomTypes{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room Type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /room_types/:id
func UpdateRoomTypes(c *gin.Context) {
	var roomTypes entity.RoomTypes
	id := c.Param("id")

	if err := config.DB().First(&roomTypes, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&roomTypes); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&roomTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roomTypes})
}
