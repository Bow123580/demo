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

  //Semester Data
	Semester1 :=Semester{
		Semester: "ภาคการศึกษาที่ 1",
	}
	db.Model(&Semester{}).Create(&Semester1)

	Semester2 :=Semester{
		Semester: "ภาคการศึกษาที่ 2",
	}
	db.Model(&Semester{}).Create(&Semester2)

	Semester3 :=Semester{
		Semester: "ภาคการศึกษาที่ 3",
	}
	db.Model(&Semester{}).Create(&Semester3)


	// ExamType Data
	type1 := ExamType{
		Type: "กลางภาค",
	}
	db.Model(&ExamType{}).Create(&type1)

	type2 := ExamType{
		Type: "ปลายภาค",
	}
	db.Model(&ExamType{}).Create(&type2)

}