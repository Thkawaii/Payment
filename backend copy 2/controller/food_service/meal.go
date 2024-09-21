package food_service

import (
	"net/http"
	"project-sa67/entity/food_service"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// GET /meals
func ListMeals(c *gin.Context) {
	var meals []food_service.Meal

	if err := config.DB().Find(&meals).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meals})
}

// GET /meals/:id
func GetMeal(c *gin.Context) {
	var meal food_service.Meal
	id := c.Param("id")

	if err := config.DB().First(&meal, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meal})
}

// POST /meals
func CreateMeal(c *gin.Context) {
	var meal food_service.Meal
	if err := c.ShouldBindJSON(&meal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&meal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": meal})
}

// PATCH /meals/:id
func UpdateMeal(c *gin.Context) {
	var meal food_service.Meal
	id := c.Param("id")
	
	if err := config.DB().First(&meal, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	
	if err := c.ShouldBindJSON(&meal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&meal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": meal})
}

// DELETE /meals/:id
func DeleteMeal(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&food_service.Meal{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meal not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
