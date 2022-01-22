package entity

import (
//	"time"

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
    &Teacher{},&Semester{},&ExamType{},&Program{},&Course{},&ExamSchedule{},
  )
 
  db = database

	
	teacher1 := Teacher{
		TeacherID: "T000001",
		Name: "ผู้ช่วยศาสตราจารย์ ดร.ชาญวิทย์ แก้วกสิ",
		Email: "chanwit@gmail.com",
		Password: "",
		Prefix: "Mr.",
		Major: "CPE",
	}
	db.Model(&Teacher{}).Create(&teacher1)
	teacher2 := Teacher{
		TeacherID: "T0023581",
		Name: "ผู้ช่วยศาสตราจารย์ ดร.นันทวุฒิ คะอังกุ",
		Email: "nuntawut@gmail.com",
		Password: "",
		Prefix: "Mr.",
		Major: "CPE",
	}
	db.Model(&Teacher{}).Create(&teacher2)
	teacher3 := Teacher{
		TeacherID: "T0157690",
		Name: "ผู้ช่วยศาสตราจารย์ ดร.ศรัญญา กาญจนวัฒนา",
		Email: "sarunya@gmail.com",
		Password: "",
		Prefix: "Miss",
		Major: "CPE",
	}
	db.Model(&Teacher{}).Create(&teacher3)
	teacher4 := Teacher{
		TeacherID: "T1578952",
		Name: "ผู้ช่วยศาสตราจารย์ ดร.ปรเมศวร์ ห่อแก้ว",
		Email: "paramate@gmail.com",
		Password: "",
		Prefix: "Mr.",
		Major: "CPE",
	}
	db.Model(&Teacher{}).Create(&teacher4)

  
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

	program1 :=Program{
		Programname: "Thai Program",
	}
	db.Model(&Program{}).Create(&program1) 
	program2 :=Program{
		Programname: "International Program",
	}
	db.Model(&Program{}).Create(&program2) 
	

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

	/*exam1 := ExamSchedule{
		Semester: Semester1,
		AcamedicYear: 2564,
		ExamType: type2,
		Course: course2,
		RoomExam: "B5204",
		DateExam: 2021-12-05,
		StartTime: time.Now(),
		EndTime: time.Now(),
	}
	db.Model(&ExamSchedule{}).Create(&exam1)
	exam2 := ExamSchedule{
		Semester: Semester2,
		AcamedicYear: 2564,
		ExamType: type2,
		Course: course2,
		RoomExam: "B1125",
		DateExam: time.Now(),
		StartTime: time.Now(),
		EndTime: time.Now(),
	}
	db.Model(&ExamSchedule{}).Create(&exam2)
	exam3 := ExamSchedule{
		Semester: Semester3,
		AcamedicYear: 2564,
		ExamType: type2,
		Course: course2,
		RoomExam: "B1122",
		DateExam: time.NewTimer(),
		StartTime: time.Now(),
		EndTime: time.Now(),
	}
	db.Model(&ExamSchedule{}).Create(&exam3)*/
}