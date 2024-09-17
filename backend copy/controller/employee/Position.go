package employee

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"project-sa67/config"
	"project-sa67/entity/employee"
)

// GET /positions
func ListPositions(c *gin.Context) {
	var positions []entity.Position

	db := config.DB()

	db.Find(&positions)

	c.JSON(http.StatusOK, &positions)
}
