package main

import (
	"blog-app/database"
	"blog-app/model"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	// Connect to database
	database.ConnectDB()

	// Create the Gin router
	router := gin.Default()

	// Creation endpoint
	router.POST("/users", model.CreateUser)

	// Login endpoint
	router.POST("/login", model.GetUser)

	err := router.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
