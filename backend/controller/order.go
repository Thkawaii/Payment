package controller

import (
	"net/http"
	"project-sa67/entity"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /orders
func CreateOrder(c *gin.Context) {
	var order entity.Order
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
	var order entity.Order
	id := c.Param("id")

	if err := config.DB().First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}

// GET /orders
func ListOrders(c *gin.Context) {
	var orders []entity.Order

	if err := config.DB().Find(&orders).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
}

// DELETE /orders/:id
func DeleteOrder(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Order{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /orders/:id
func UpdateOrder(c *gin.Context) {
	var order entity.Order
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
