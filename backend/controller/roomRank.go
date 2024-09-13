package controller

import (
	"net/http"
	"project-sa67/entity"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /room_ranks
func CreateRoomRank(c *gin.Context) {
	var roomRank entity.RoomRank
	if err := c.ShouldBindJSON(&roomRank); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&roomRank).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": roomRank})
}

// GET /room_ranks/:id
func GetRoomRank(c *gin.Context) {
	var roomRank entity.RoomRank
	id := c.Param("id")

	if err := config.DB().First(&roomRank, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roomRank})
}

// GET /room_ranks
func ListRoomRanks(c *gin.Context) {
	var roomRanks []entity.RoomRank

	db := config.DB()
	results := db.Preload("RoomTypesRoomRanks").Find(&roomRanks)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, roomRanks)
}

// DELETE /room_ranks/:id
func DeleteRoomRank(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.RoomRank{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room Rank not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /room_ranks/:id
func UpdateRoomRank(c *gin.Context) {
	var roomRank entity.RoomRank
	id := c.Param("id")

	if err := config.DB().First(&roomRank, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&roomRank); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&roomRank).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roomRank})
}
