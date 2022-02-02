package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestExamSchdulePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	examschedule := ExamSchedule{
		AcademicYear: 2564,
		RoomExam: "B5204",
		
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(examschedule)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

//ตรวจสอบปีการศึกษาต้องไม่เป็นตัวเลข 4 หลักต้องเจอ Error 
func TestAcademicYearMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []uint{
		12345, //ตัวเลข 5 หลัก
		123, //ตัวเลข 3 หลัก
		12, //ตัวเลข 2 หลัก
		1, //ตัวเลข 1 หลัก
		0,
	}

	for _, fixture := range fixtures {
		examschedule := ExamSchedule{
			AcademicYear: fixture, //ผิด
			RoomExam: "B5204", 
		}

		ok, err := govalidator.ValidateStruct(examschedule)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("AcademicYear must be 4 digits"))
	}
}	

// ตรวจสอบห้องสอบไม่เป็นตามรูปแบบแล้วต้องเจอ Error
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
		}

		ok, err := govalidator.ValidateStruct(examschedule)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`RoomExam: %s does not validate as matches(^[B]\\d{4}$)`, fixture)))
	}
	

}
