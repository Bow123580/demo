package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestExamSchdulePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	examschedule := ExamSchedule{
		AcademicYear: 2564,
		RoomExam: "B5204",
		ExamDate: time.Now().Add(time.Hour*24),
		StartTime: time.Now(),
		
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(examschedule)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

//ตรวจสอบปีการศึกษาต้องตัวเลขในช่วง 2500-2600
func TestAcademicYearMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

		examschedule := ExamSchedule{
			AcademicYear: 0, //ผิด
			RoomExam: "B5204", 
			ExamDate: time.Now().Add(time.Hour*24),
			StartTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(examschedule)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("ข้อมูลปีการศึกษาไม่ถูกต้อง"))
	
}	

// ตรวจสอบห้องสอบต้องขึ้นต้นด้วย B และตามด้วยตัวเลข 4 ตัว
func TestRoomExamMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"X60000",
		"BA0000",  // B ตามด้วย A และ \d 4 ตัว
		"B00000",   // B ตามด้วย \d 5 ตัว
		"B000000", // B ตามด้วย \d 6 ตัว
		"B0000000", // B ตามด้วย \d 7 ตัว
		"F11-422", // ขึ้นต้น F 
		"B", //ตัวอักษร 1 ตัว
		"11111", //มีแต่ตัวเลข
	}

	for _, fixture := range fixtures {
		examschedule := ExamSchedule{
			AcademicYear: 2564,
			RoomExam: fixture, //ผิด
			ExamDate: time.Now().Add(time.Hour*48),
			StartTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(examschedule)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("ข้อมูลห้องสอบไม่ถูกต้อง"))
	}
}

//ตรวจสอบวันที่สอบต้องเป็นวันที่ในอนาคต
func TestDateExamMustBePresent(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []time.Time{
		time.Now().Add(-24 * time.Hour),
		time.Now(), 
	}

	for _, fixture := range fixtures {
		examschedule := ExamSchedule{
			AcademicYear: 2564,
			RoomExam: "B5204",
			ExamDate: fixture,
			StartTime: time.Now(),
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(examschedule)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("วันที่สอบต้องเป็นวันในอนาคต"))
	}
}