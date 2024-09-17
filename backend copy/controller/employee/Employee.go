package employee

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"project-sa67/entity/employee"
	"project-sa67/config"
)

// POST /employees
func CreateEmployee(c *gin.Context) {
	var employee entity.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา Position ด้วย PositionID
	var position entity.Position
	db.First(&position, employee.PositionID)
	if position.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "position not found"})
		return
	}

	// สร้าง Employee
	if err := db.Create(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": employee})
}

// GET /employees/:id
func GetEmployee(c *gin.Context) {
	ID := c.Param("id")
	var employee entity.Employee

	db := config.DB()
	result := db.Preload("Position").First(&employee, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	if employee.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, employee)
}

// GET /employees
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee

	db := config.DB()
	result := db.Preload("Position").Find(&employees)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, employees)
}

// DELETE /employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

// PATCH /employees/:id
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee

	ID := c.Param("id")

	db := config.DB()
	result := db.First(&employee, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&employee)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
