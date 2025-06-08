package model

import "gorm.io/gorm"

type Interaction struct {
	gorm.Model
	UserID int    `json:"userId"`
	PostID int    `json:"postId"`
	Type   string `json:"type"`
}
