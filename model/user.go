package model

import (
	"blog-app/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type User struct {
	gorm.Model
	Username string `json:"username"`
	Password string `json:"password"`
}

func CreateUser(context *gin.Context) {
	// Parse JSON request body into User struct
	var user User
	if err := context.ShouldBindJSON(&user); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Migrate the database schema
	err := database.DB.AutoMigrate(&User{})
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Insert user into database using gorm
	result := database.DB.Create(&user)
	if result.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	// Confirm user has been created
	context.JSON(http.StatusOK, gin.H{"message": "User created", "userID": user.ID})
}

func GetUser(context *gin.Context) {
	// Parse JSON request body into User struct
	var user User
	if err := context.ShouldBindJSON(&user); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Migrate the database schema
	err := database.DB.AutoMigrate(&User{})
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Get the user with the specified username and password
	result := database.DB.Where("username = ? AND password = ?", user.Username, user.Password).First(&user)

	// Check if user was found
	if result.RowsAffected == 0 {
		context.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "User found", "userID": user.ID})
}
