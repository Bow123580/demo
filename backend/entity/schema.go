package entity

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	ID_student string `gorm:"uniqueIndex"`
	Prefix     string
	Name       string
	Major      string
	Year       uint
	Email      string
	Password   string

	Withdrawals []Withdrawal `gorm:"foreignKey:StudentID"`
}

type Teacher struct {
	gorm.Model
	ID_teacher string `gorm:"uniqueIndex"`
	Prefix     string
	Name       string
	Major      string
	Email      string
	Password   string

	AddCourse   []AddCourse  `gorm:"foreignKey:TeacherID"`
	Withdrawals []Withdrawal `gorm:"foreignKey:TeacherID"`
}

type Registrar struct {
	gorm.Model
	ID_registrar string `gorm:"uniqueIndex"`
	Prefix       string
	Name         string
	Email        string
	Password     string
}

type Course struct {
	gorm.Model
	Coursename   string
	Coursenumber int32

	Withdrawals  []Withdrawal   `gorm:"foreignKey:CourseID"`
	ExamSchedule []ExamSchedule `gorm:"foreignKey:CourseID"`
	AddCourse    []AddCourse    `gorm:"foreignKey:CourseID"`
}

type Program struct {
	gorm.Model
	Programname string
	AddCourse   []AddCourse `gorm:"foreignKey:ProgramID"`
}

type Semester struct {
	gorm.Model
	Semester string

	Withdrawals  []Withdrawal   `gorm:"foreignKey:SemesterID"`
	ExamSchedule []ExamSchedule `gorm:"foreignKey:SemesterID"`
}

type ExamType struct {
	gorm.Model
	Type         string
	ExamSchedule []ExamSchedule `gorm:"foreignKey:ExamTypeID"`
}

type AddCourse struct {
	gorm.Model
	Credit   int16
	DayTime  string
	SaveTime time.Time

	CourseID *uint
	Course   Course `gorm:"references:id"`

	ProgramID *uint
	Program   Program `gorm:"references:id"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`
}

type ExamSchedule struct {
	gorm.Model
	AcamedicYear int16
	RoomExam     string
	DateExam     time.Time
	StartTime    time.Time
	EndTime      time.Time

	CourseID *uint
	Course   Course `gorm:"references:id"`

	ExamTypeID *uint
	ExamType   ExamType `gorm:"references:id"`

	SemesterID *uint
	Semester   Semester `gorm:"references:id"`
}

type Withdrawal struct {
	gorm.Model

	StudentID *uint
	Student   Student `gorm:"references:id"`

	CourseID *uint
	Course   Course `gorm:"references:id"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`

	SemesterID *uint
	Semester   Semester `gorm:"references:id"`

	YearTime       int
	RemainCredit   int
	Reason         string
	WithdrawalTime time.Time
}
