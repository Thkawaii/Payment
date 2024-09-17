package employee

import (
	"errors"
	"net/http"
	"project-sa67/config"
	"project-sa67/entity/employee"
	"project-sa67/services"
	"time"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)


type (

   Authen struct {
       Email    string `json:"email"`
       Password string `json:"password"`
   }

   signUp struct {
        FirstName       string
        LastName        string
        Email           string
        Password        string
        Gender          string
        Date_of_Birth   time.Time

        // PositionID ทำหน้าที่เป็น FK
        PositionID      *uint
        Position        Position     `gorm:"foriegnKey:PositionID"`
   }

    Position struct {
        gorm.Model
        Position_Name string

        // 1 Doctor เป็นเจ้าของได้หลาย Prescription
        Employee []signUp `gorm:"foreignKey:PositionID"`
    }

)


func SignUp(c *gin.Context) {
	var payload signUp

	// Bind JSON payload to the struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var userCheck entity.Employee

	// Check if the user with the provided email already exists
	result := db.Where("email = ?", payload.Email).First(&userCheck)
	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// If there's a database error other than "record not found"
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if userCheck.ID != 0 {
		// If the user with the provided email already exists
		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		return
	}

	// Hash the user's password
	hashedPassword, _ := config.HashPassword(payload.Password)

	// Create a new employee record
	employee := entity.Employee{
		FirstName:   payload.FirstName,
		LastName:    payload.LastName,
		Email:       payload.Email,
		Password:    hashedPassword,
		Gender:      payload.Gender, // Placeholder, adjust as needed
		Date_of_Birth: payload.Date_of_Birth, // Make sure the field matches
	}

	// Save the employee to the database
	if err := db.Create(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful", "data": employee})
}



func SignIn(c *gin.Context) {
	var payload Authen
	var employee entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย Email ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Where("email = ?", payload.Email).First(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found"})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect password"})
		return
	}

	// สร้าง JWT Token
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(employee.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error signing token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": employee.ID})
}
