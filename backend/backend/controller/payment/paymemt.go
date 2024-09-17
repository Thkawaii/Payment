package payment

import (
	"net/http"
	"project-sa67/entity/payment"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /orders
func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": payment})
}

// GET /orders/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")

	db := config.DB()
	results := db.Preload("Booking").Find(&payment, id)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, payment)
}

// GET /orders
func ListPayment(c *gin.Context) {
	var payments []entity.Payment

	db := config.DB()
	results := db.Preload("Booking").Find(&payments)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	
    c.JSON(http.StatusOK, payments)
}

// DELETE /orders/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Payment{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /orders/:id
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")

	if err := config.DB().First(&payment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}