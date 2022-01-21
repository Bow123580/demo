package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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
    &Semester{},&ExamType{},&Course{},&ExamSchedule{},
  )
 
  db = database

	/*
	teacher1 := Teacher{

	}
	*/
  
	//Course Data
	course1 := Course{
		Coursename: "SOFTWARE ENGINEERING",
		Coursenumber: 523332,
	}
	db.Model(&Course{}).Create(&course1)
	course2 := Course{
		Coursename: "COMPUTER AND COMMUNICATION",
		Coursenumber: 523352,
	}
	db.Model(&Course{}).Create(&course2)
	course3 := Course{
		Coursename: "OPERATING SYSTEMS",
		Coursenumber: 523354,
	}
	db.Model(&Course{}).Create(&course3)
	course4 := Course{
		Coursename: "System Analysis and Design",
		Coursenumber: 523331,
	}
	db.Model(&Course{}).Create(&course4)
	course5 := Course{
		Coursename: "DATABASE SYSTEMS",
		Coursenumber: 523211,
	}
	db.Model(&Course{}).Create(&course5)
	course6 := Course{
		Coursename: "COMPUTER STATISTICS",
		Coursenumber: 523301,
	}
	db.Model(&Course{}).Create(&course6)

	/*program1 :=Program{
		Program: "Thai Program"
	}
	db.Model(&Program{}).Create(&program1) 
	program2 :=Program{
		Program: "International Program"
	}
	db.Model(&Program{}).Create(&program2) 
	*/

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

	/*
	addcourse1 := AddCourse{
		Course: course1,
		Program: program1,
		Teacher: teacher1,
		Credit: 4,
		DayTime: "",
		SaveTime: time.Now(),
	}
	db.Model(&AddCourse{}).Create(&addcourse1)

	*/

	exam1 := ExamSchedule{
		AcamedicYear: 2564,
		ExamType: type2,
		Course: course2,
		RoomExam: "B5204",
		DateExam: 2021-10-02,
		StartTime: ,
		EndTime: ,
	}
	db.Model(&ExamSchedule{}).Create(&exam1)
	exam2 := ExamSchedule{
		AcamedicYear: 2564,
		ExamType: type2,
		Course: course2,
		RoomExam: "B1125",
		DateExam: 2021-10-05,
		StartTime: ,
		EndTime: ,
	}
	db.Model(&ExamSchedule{}).Create(&exam2)
	exam3 := ExamSchedule{
		AcamedicYear: 2564,
		ExamType: type2,
		Course: course2,
		RoomExam: "B1122",
		DateExam: 2021-05-03,
		StartTime: ,
		EndTime: ,
	}
	db.Model(&ExamSchedule{}).Create(&exam3)
}