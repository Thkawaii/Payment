package food_service

import (
	"net/http"
	"project-sa67/entity/food_service"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// GET /food-categories
func ListFoodCategories(c *gin.Context) {
	var categories []food_service.FoodCategory

	if err := config.DB().Find(&categories).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

// GET /food-categories/:id
func GetFoodCategory(c *gin.Context) {
	var category food_service.FoodCategory
	id := c.Param("id")

	if err := config.DB().First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": category})
}

// POST /food-categories
func CreateFoodCategory(c *gin.Context) {
	var category food_service.FoodCategory
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": category})
}

// PATCH /food-categories/:id
func UpdateFoodCategory(c *gin.Context) {
	var category food_service.FoodCategory
	id := c.Param("id")

	if err := config.DB().First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := config.DB().Save(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": category})
}

// DELETE /food-categories/:id
func DeleteFoodCategory(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&food_service.FoodCategory{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
