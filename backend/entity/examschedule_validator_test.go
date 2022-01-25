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

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error

func TestRoomExamMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"X60000",
		"BA0000",  // B ตามด้วย A และ \d 4 ตัว
		"B00000",   // B ตามด้วย \d 5 ตัว
		"B000000", // B ตามด้วย \d 6 ตัว
		"B0000000", // B ตามด้วย \d 7 ตัว
		"F11-422", // F 
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
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`RoomExam: %s does not validate as matches(^[B]\d{4}$)`, fixture)))
	}
	

}