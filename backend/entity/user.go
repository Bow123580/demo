package entity
 
import (
//  "time"
  "gorm.io/gorm"
)
 
type Semester struct {
	gorm.Model
	Semester  string
	//ExamSchedule []ExamSchedule `gorm:"foreignKey:SemesterID"`
}

type ExamType struct {
	gorm.Model
	Type  string
	//ExamSchedule []ExamSchedule `gorm:"foreignKey:ExamTypeID"`
}