package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReasonPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	withdrawal := Withdrawal{
		YearTime:       2564,
		RemainCredit:   20,
		Reason:         "เรียนหนัก",
		WithdrawalTime: time.Now(),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(withdrawal)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestReasonNotBlank(t *testing.T) {

	g := NewGomegaWithT(t)

	withdrawal := Withdrawal{
		YearTime:       2564,
		RemainCredit:   20,
		Reason:         "",
		WithdrawalTime: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(withdrawal)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Reason cannot be blank"))

}

/*
func TestRemainCreditPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	withdrawal := Withdrawal{
		YearTime:       2564,
		RemainCredit:   20,
		Reason:         "เรียนหนัก",
		WithdrawalTime: time.Now(),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(withdrawal)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}*/

func TestRemainCreditInt(t *testing.T) {

	g := NewGomegaWithT(t)

	withdrawal := Withdrawal{
		YearTime:       2564,
		RemainCredit:   -1,
		Reason:         "work hard",
		WithdrawalTime: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(withdrawal)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("RemainCredit must be int"))

}
