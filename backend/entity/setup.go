package entity
 
import (
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)
 
var db *gorm.DB
 
func DB() *gorm.DB {
	return db
}
 
func SetupDatabase() {
  database, err := gorm.Open(sqlite.Open("se-g07.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }
  database.AutoMigrate(
    &Semester{},&ExamType{},
  )
 
  db = database

}