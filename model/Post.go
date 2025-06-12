package model

import (
	"blog-app/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type Post struct {
	gorm.Model
	AuthorID int    `json:"authorId"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Category string `json:"category"`
}

func CreatePost(context *gin.Context) {
	// Parse JSON request body into Post struct
	var post Post
	if err := context.ShouldBindJSON(&post); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Migrate the database schema
	err := database.DB.AutoMigrate(&Post{})
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Insert post into database using gorm
	result := database.DB.Create(&post)
	if result.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	// Confirm post has been created
	context.JSON(http.StatusOK, gin.H{"message": "Post created", "postID": post.ID})
}

func ListPosts(context *gin.Context) {
	// Create a slice of Posts
	var posts []Post

	// Migrate the database schema
	err := database.DB.AutoMigrate(&Post{})
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Query database for posts
	result := database.DB.Find(&posts)
	if result.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	// Check if there are posts
	if result.RowsAffected == 0 {
		context.JSON(http.StatusNotFound, gin.H{"error": "Posts not found"})
		return
	}

	// Return slice of posts
	context.JSON(http.StatusOK, gin.H{"posts": posts})
}

func GetPost(context *gin.Context) {
	// Get id param from gin context
	var id = context.Param("id")

	// Create a new post
	var post Post

	// Migrate the database schema
	err := database.DB.AutoMigrate(&Post{})
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Query database for the post
	result := database.DB.First(&post, id)
	if result.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	// Return the post
	context.JSON(http.StatusOK, gin.H{"message": "post found", "post": post})
}

func DeletePost(context *gin.Context) {
	// Get id param from gin context
	var id = context.Param("id")

	// Create a new post
	var post Post

	// Migrate the database schema
	err := database.DB.AutoMigrate(&User{})
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Query database for the post
	result := database.DB.First(&post, id)
	if result.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	// Delete Post from database using gorm
	result = database.DB.Delete(&post, id)
	if result.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	// Confirm Post has been deleted
	context.JSON(http.StatusOK, gin.H{"message": "Post deleted", "postID": post.ID})
}
