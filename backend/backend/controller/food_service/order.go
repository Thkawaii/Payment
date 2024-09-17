package food_service

import (
	"net/http"
	"project-sa67/entity/food_service"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /orders
func CreateOrder(c *gin.Context) {
	var order food_service.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": order})
}

// GET /orders/:id
func GetOrder(c *gin.Context) {
	var order food_service.Order
	id := c.Param("id")

	if err := config.DB().First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}

// GET /orders
func ListOrders(c *gin.Context) {
	var bookings []food_service.Order

	db := config.DB()
	results := db.Preload("Menu").Find(&bookings)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, bookings)
}

// DELETE /orders/:id
func DeleteOrder(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&food_service.Order{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /orders/:id
func UpdateOrder(c *gin.Context) {
	var order food_service.Order
	id := c.Param("id")

	if err := config.DB().First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}
