package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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

	RegisCourse    []RegisCourse    `gorm:"foreignKey:StudentID"`
	Withdrawals    []Withdrawal     `gorm:"foreignKey:StudentID"`
	RequestExams   []RequestExam    `gorm:"foreignKey:StudentID"`
	RecordPetition []RecordPetition `gorm:"foreignKey:StudentID"`
	IncreaseGrades []IncreaseGrades `gorm:"foreignKey:StudentID"`
}

type Teacher struct {
	gorm.Model
	ID_teacher string `gorm:"uniqueIndex"`
	Prefix     string
	Name       string
	Major      string
	Email      string
	Password   string

	AddCourse    []AddCourse   `gorm:"foreignKey:TeacherID"`
	RequestExams []RequestExam `gorm:"foreignKey:StudentID"`
}

type Registrar struct {
	gorm.Model
	ID_registrar string `gorm:"uniqueIndex"`
	Prefix       string
	Name         string
	Email        string
	Password     string
}

type Semester struct {
	gorm.Model
	Semester     string
	ExamSchedule []ExamSchedule `gorm:"foreignKey:SemesterID"`
	RequestExams []RequestExam  `gorm:"foreignKey:SemesterID"`
}

type ExamType struct {
	gorm.Model
	Type         string
	ExamSchedule []ExamSchedule `gorm:"foreignKey:ExamTypeID"`
}

type Course struct {
	gorm.Model
	Coursename   string
	Coursenumber int32 `gorm:"uniqueIndex"`

	RegisCourse    []RegisCourse    `gorm:"foreignKey:CourseID"`
	ExamSchedule   []ExamSchedule   `gorm:"foreignKey:CourseID"`
	AddCourse      []AddCourse      `gorm:"foreignKey:CourseID"`
	IncreaseGrades []IncreaseGrades `gorm:"foreignKey:CourseID"`
	RecordPetition []RecordPetition `gorm:"foreignKey:CourseID"`
	RequestExams   []RequestExam    `gorm:"foreignKey:CourseID"`
}

type Program struct {
	gorm.Model
	Programname string

	AddCourse []AddCourse `gorm:"foreignKey:ProgramID"`
}

type RequestStatus struct {
	gorm.Model
	Status       string
	RequestExams []RequestExam `gorm:"foreignKey:RequestStatusID"`
}

type Grades struct {
	gorm.Model
	Grade string

	IncreaseGrades []IncreaseGrades `gorm:"foreignKey:GradesID"`
}

type Petition struct {
	gorm.Model
	Claim string

	RecordPetition []RecordPetition `gorm:"foreignKey:PetitionID"`
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
	AcademicYear int16   `valid:"range(2500|2600)~ข้อมูลปีการศึกษาไม่ถูกต้อง, required~ข้อมูลปีการศึกษาไม่ถูกต้อง"`
	RoomExam     string `valid:"matches(^[B]\\d{4}$)~ข้อมูลห้องสอบไม่ถูกต้อง, required~ข้อมูลห้องสอบไม่ถูกต้อง"`
	ExamDate     time.Time `valid:"future~วันที่สอบต้องเป็นวันในอนาคต"`
	StartTime    time.Time
	EndTime      time.Time

	CourseID *uint
	Course   Course `gorm:"references:id" valid:"-"`

	ExamTypeID *uint
	ExamType   ExamType `gorm:"references:id" valid:"-"`

	SemesterID *uint
	Semester   Semester `gorm:"references:id" valid:"-"`
}

type RegisCourse struct {
	gorm.Model

	StudentID *uint
	Student   Student `gorm:"references:id"`

	CourseID *uint
	Course   Course `gorm:"references:coursenumber"`

	Withdrawal []Withdrawal `gorm:"foreignKey:RegisCourseID"`
}

type Withdrawal struct {
	gorm.Model

	StudentID *uint
	Student   Student `gorm:"references:id" valid:"-"`

	RegisCourseID *uint
	RegisCourse   RegisCourse `gorm:"references:id" valid:"-"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id" valid:"-"`

	SemesterID *uint
	Semester   Semester `gorm:"references:id" valid:"-"`

	YearTime       int       // `valid:"range(2000|2999)~YearTime must be in range 2500-2600"`
	RemainCredit   int       // `valid:"range(1|1000)~RemainCredit must be integer positive number"`
	Reason         string    // `valid:"required~Reason cannot be blank"`
	WithdrawalTime time.Time // `valid:"past~WithdrawalTime must be in the present"`
}

type RequestExam struct {
	gorm.Model

	StudentID *uint
	Student   Student `gorm:"references:id"`

	SemesterID *uint
	Semester   Semester `gorm:"references:id"`

	AcademicYear int

	CourseID *uint
	Course   Course `gorm:"references:id"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`

	Tel string

	RequestStatusID *uint
	RequestStatus   RequestStatus `gorm:"references:id"`

	RequestTime time.Time
}

type RecordPetition struct {
	gorm.Model

	Because          string
	RegisteredCredit int
	TimeRecord       time.Time

	StudentID *uint
	Student   Student `gorm:"references:id"`

	PetitionID *uint
	Petition   Petition `gorm:"references:id"`

	CourseID *uint
	Course   Course `gorm:"references:id"`
}

type IncreaseGrades struct {
	gorm.Model
	Date        time.Time
	GradePoint  int
	Description string

	StudentID *uint
	Student   Student `gorm:"references:id"`

	GradesID *uint
	Grades   Grades `gorm:"references:id"`

	CourseID *uint
	Course   Course `gorm:"references:id"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := (time.Now().Add(1 + time.Millisecond))
		return now.After(t)
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.Before(t)
	})
}
