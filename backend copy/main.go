package main

import (
	"net/http"
	"project-sa67/config"
	// "project-sa67/controller"
	"project-sa67/controller/employee"
	"project-sa67/controller/room"
	"project-sa67/controller/meeting_room"
	"project-sa67/controller/food_service"
	"project-sa67/controller/payment"
	"project-sa67/controller/dashboard"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	
	config.ConnectionDB()
   	config.SetupDatabase()

   	r := gin.Default()

	r.Use(CORSMiddleware())


	// Auth Route
	r.POST("/signup", employee.SignUp)
   	r.POST("/signin", employee.SignIn)

	router := r.Group("")
	{
		// Employee Routes
		router.GET("/employees", employee.ListEmployees)
		router.GET("/employees/:id", employee.GetEmployee)
		router.POST("/employees", employee.CreateEmployee)
		router.PATCH("/employees/:id", employee.UpdateEmployee)
		router.DELETE("/employees/:id", employee.DeleteEmployee)

		// Position Routes
		router.GET("/positions", employee.ListPositions)

		// Booking Routes
		router.POST("/bookings", room.CreateBooking)
		router.GET("/bookings/:id", room.GetBooking)
		router.GET("/bookings", room.ListBookings)
		router.DELETE("/bookings/:id", room.DeleteBooking)
		router.PATCH("/bookings/:id", room.UpdateBooking)

		// Room Type Routes
		router.GET("/roomtypes", room.ListRoomTypes)
		router.GET("/roomtype", room.ListRoomTypes)

		// Room Routes
		router.GET("/rooms", room.ListRooms)
		router.GET("/rooms/:id", room.GetRoom)
		router.PATCH("/rooms/:id", room.UpdateRoom)

		// customers Routes
		router.POST("/customers", room.CreateCustomer)
		router.GET("/customers", room.ListCustomers)

		
		// meetingRoom Routes
		router.GET("/meetingRoom", meeting_room.ListMeetingRoom)
		router.GET("/meetingRoom/:id", meeting_room.GetMeetingRoom) // Corrected route name
		router.POST("/meetingRoom", meeting_room.CreateMeetingRoom) // Assuming you want to create a meeting room
		router.PATCH("/meetingRoom", meeting_room.UpdateMeetingRoom)
		router.DELETE("/meetingRoom/:id", meeting_room.DeleteMeetingRoom)

		// customerMeetingRoom Routes
		router.GET("/customerMeetingRoom", meeting_room.ListCustomerMeetingRoom)
		router.GET("/customerMeetingRoom/:id", meeting_room.GetCustomerMeetingRoom) // Corrected route name
		router.POST("/customerMeetingRoom", meeting_room.CreateCustomerMeetingRoom) // Assuming you want to create a customer meeting room
		router.PATCH("/customerMeetingRoom", meeting_room.UpdateCustomerMeetingRoom)
		router.DELETE("/customerMeetingRoom/:id", meeting_room.DeleteCustomerMeetingRoom)

		// bookingMeetingRoom Routes
		router.GET("/bookingMeetingRoom", meeting_room.ListBookingMeetingRoom)
		router.GET("/bookingMeetingRoom/:id", meeting_room.GetBookingMeetingRoom) // Corrected route name
		router.POST("/bookingMeetingRoom", meeting_room.CreateBookingMeetingRoom) // Assuming you want to create a booking for a meeting room
		router.PATCH("/bookingMeetingRoom", meeting_room.UpdateBookingMeetingRoom)
		router.DELETE("/bookingMeetingRoom/:id", meeting_room.DeleteBookingMeetingRoom)

		// FoodCategory Routes
		router.POST("/food-categories", food_service.CreateFoodCategory)
		router.GET("/food-categories/:id", food_service.GetFoodCategory)
		router.GET("/food-categories", food_service.ListFoodCategories)
		router.DELETE("/food-categories/:id", food_service.DeleteFoodCategory)
		router.PATCH("/food-categories/:id", food_service.UpdateFoodCategory)

		// Meal Routes
		router.POST("/meals", food_service.CreateMeal)
		router.GET("/meals/:id", food_service.GetMeal)
		router.GET("/meals", food_service.ListMeals)
		router.DELETE("/meals/:id", food_service.DeleteMeal)
		router.PATCH("/meals/:id", food_service.UpdateMeal)

		// Menu Routes
		router.POST("/menus", food_service.CreateMenu)
		router.GET("/menus/:id", food_service.GetMenu)
		router.GET("/menus", food_service.ListMenus)
		router.DELETE("/menus/:id", food_service.DeleteMenu)
		router.PATCH("/menus/:id", food_service.UpdateMenu)

		// Order Routes
		router.POST("/orders", food_service.CreateOrder)
		router.GET("/orders/:id", food_service.GetOrder)
		router.GET("/orders", food_service.ListOrders)
		router.DELETE("/orders/:id", food_service.DeleteOrder)
		router.PATCH("/orders/:id", food_service.UpdateOrder)

		// Payment Routes
		router.POST("/payments", payment.CreatePayment)
		router.GET("/payments/:id", payment.GetPayment)
		router.GET("/payments", payment.ListPayment)
		router.DELETE("/payments/:id", payment.DeletePayment)
		router.PATCH("/payments/:id", payment.UpdatePayment)

		// Dashboard
		router.GET("/orders_per_day", dashboard.ListOrdersPerDay)
	}

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