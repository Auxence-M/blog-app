package database

import (
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func ConnectDB() {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	DB = db
	log.Println("Connected to database")
}
