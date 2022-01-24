package entity

import (
	"time"

	"gorm.io/gorm"
)

type Registrar struct {
	gorm.Model
	ID_registrar string `gorm:"uniqueIndex"`
	Name         string
	Email        string `gorm:"uniqueIndex"`
	Password     string
}

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

<<<<<<< HEAD
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

=======
	AddCourses  []AddCourse  `gorm:"foreignKey:TeacherID"`
	Withdrawals []Withdrawal `gorm:"foreignKey:TeacherID"`
}

>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
type Course struct {
	gorm.Model
	Coursename   string
	Coursenumber int32

<<<<<<< HEAD
	Withdrawals  []Withdrawal   `gorm:"foreignKey:CourseID"`
	ExamSchedule []ExamSchedule `gorm:"foreignKey:CourseID"`
	AddCourse    []AddCourse    `gorm:"foreignKey:CourseID"`
=======
	ExamSchedule []ExamSchedule `gorm:"foreignKey:CourseID"`
	AddCourse    []AddCourse    `gorm:"foreignKey:CourseID"`
	Withdrawals  []Withdrawal   `gorm:"foreignKey:CourseID"`
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
}

type Program struct {
	gorm.Model
	Programname string
<<<<<<< HEAD
	AddCourse   []AddCourse `gorm:"foreignKey:ProgramID"`
=======

	AddCourse []AddCourse `gorm:"foreignKey:ProgramID"`
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
}

type Semester struct {
	gorm.Model
	Semester string

<<<<<<< HEAD
	Withdrawals  []Withdrawal   `gorm:"foreignKey:SemesterID"`
	ExamSchedule []ExamSchedule `gorm:"foreignKey:SemesterID"`
=======
	ExamSchedule []ExamSchedule `gorm:"foreignKey:SemesterID"`
	Withdrawals  []Withdrawal   `gorm:"foreignKey:SemesterID"`
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
}

type ExamType struct {
	gorm.Model
<<<<<<< HEAD
	Type         string
	ExamSchedule []ExamSchedule `gorm:"foreignKey:ExamTypeID"`
}

=======
	Type string

	ExamSchedule []ExamSchedule `gorm:"foreignKey:ExamTypeID"`
}

type RequestStatus struct {
	gorm.Model
	Status string
}

type Petition struct {
	gorm.Model
	Claim string
}

>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
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
