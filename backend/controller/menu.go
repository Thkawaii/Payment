package controller

import (
	"net/http"
	"project-sa67/entity"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /menus
func CreateMenu(c *gin.Context) {
    var menu entity.Menu
    if err := c.ShouldBindJSON(&menu); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    var meal entity.Meal
    db.First(&meal, menu.MealID)
    if meal.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "meal not found"})
        return
    }

    var foodCategory entity.FoodCategory
    db.First(&foodCategory, menu.FoodCategoryID)
    if foodCategory.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "foodCategory not found"})
        return
    }

    m := entity.Menu{
        MenuList:  menu.MenuList,
        Price:     menu.Price,
        Description: menu.Description,
        MealID:    menu.MealID,
        Meal:      &meal,
        FoodCategoryID: menu.FoodCategoryID,
        FoodCategory: &foodCategory,
    }

    if err := db.Create(&m).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"data": m})
}


// GET /menus/:id
func GetMenu(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")

	db := config.DB()
    results := db.Preload("Meal").Preload("FoodCategory").Find(&menu, id)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	if menu.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}

    c.JSON(http.StatusOK, menu)
}

// GET /menus
func ListMenus(c *gin.Context) {
    var menu []entity.Menu

    db := config.DB()
    results := db.Preload("Meal").Preload("FoodCategory").Find(&menu)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, menu)
}

// DELETE /menus/:id
func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Menu{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /menus/:id
func UpdateMenu(c *gin.Context) {
    var menu entity.Menu
    MenuID := c.Param("id")

    db := config.DB()
    // หาข้อมูล Menu ก่อนเพื่ออัปเดตฟิลด์ที่ต้องการ
    result := db.First(&menu, MenuID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
        return
    }

    var updateData entity.Menu
    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    // อัปเดตเฉพาะฟิลด์ที่ต้องการ
    menu.MenuList = updateData.MenuList
    menu.Price = updateData.Price
    menu.Description = updateData.Description
    menu.MealID = updateData.MealID
    menu.FoodCategoryID = updateData.FoodCategoryID

    result = db.Save(&menu)
    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}
