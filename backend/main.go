package main

import (
	"net/http"
	"project-sa67/config"
	"project-sa67/controller"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	
	config.ConnectionDB()
   	config.SetupDatabase()

   	r := gin.Default()

	r.Use(CORSMiddleware())

	// FoodCategory Routes
	r.POST("/food-categories", controller.CreateFoodCategory)
	r.GET("/food-categories/:id", controller.GetFoodCategory)
	r.GET("/food-categories", controller.ListFoodCategories)
	r.DELETE("/food-categories/:id", controller.DeleteFoodCategory)
	r.PATCH("/food-categories/:id", controller.UpdateFoodCategory)

	// Meal Routes
	r.POST("/meals", controller.CreateMeal)
	r.GET("/meals/:id", controller.GetMeal)
	r.GET("/meals", controller.ListMeals)
	r.DELETE("/meals/:id", controller.DeleteMeal)
	r.PATCH("/meals/:id", controller.UpdateMeal)

	// Booking Routes
	r.POST("/bookings", controller.CreateBooking)
	r.GET("/bookings/:id", controller.GetBooking)
	r.GET("/bookings", controller.ListBookings)
	r.DELETE("/bookings/:id", controller.DeleteBooking)
	r.PATCH("/bookings/:id", controller.UpdateBooking)

	// Menu Routes
	r.POST("/menus", controller.CreateMenu)
	r.GET("/menus/:id", controller.GetMenu)
	r.GET("/menus", controller.ListMenus)
	r.DELETE("/menus/:id", controller.DeleteMenu)
	r.PATCH("/menus/:id", controller.UpdateMenu)

	// Order Routes
	r.POST("/orders", controller.CreateOrder)
	r.GET("/orders/:id", controller.GetOrder)
	r.GET("/orders", controller.ListOrders)
	r.DELETE("/orders/:id", controller.DeleteOrder)
	r.PATCH("/orders/:id", controller.UpdateOrder)

	//Payment Routes
	r.POST("/payments", controller.CreatePayment)
	r.GET("/payments/:id", controller.GetPayment)
	r.GET("/payments", controller.ListPayment)
	r.DELETE("/payments/:id", controller.DeletePayment)
	r.PATCH("/payments/:id", controller.UpdatePayment)

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Start the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}