package model

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	PostID  int    `json:"postId"`
	UserID  int    `json:"userId"`
	Content string `json:"content"`
}
