package dashboard

import (
	"net/http"
	// "project-sa67/entity"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

func ListOrdersPerDay(c *gin.Context) {

    type OrderSummary struct {
        OrderDay   string  `json:"order_day"`
        TotalPrice float32 `json:"total_price"`
    }

    var orders []OrderSummary

    db := config.DB()
    results := db.Table("orders").
        Select("DATE(order_date) AS order_day, SUM(price) AS total_price").
        Group("DATE(order_date)").
        Order("order_day").
        Scan(&orders)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, orders)
}
