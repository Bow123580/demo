package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/PhatSut/demo/entity"
)

func CreateWithdrawal(c *gin.Context) {

	var withdrawals entity.Withdrawal
	var students entity.Student
	var semesters entity.Semester
	var teachers entity.Teacher
	var regiscourse entity.RegisCourse

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร withdrawals
	if err := c.ShouldBindJSON(&withdrawals); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา student ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.StudentID).First(&students); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	// 11: ค้นหา RegisCourse ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.RegisCourseID).First(&regiscourse); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RegisCourse not found"})
		return
	}

	// 12: ค้นหา teacher ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.TeacherID).First(&teachers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Teacher not found"})
		return
	}

	// 13: ค้นหา semester ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.SemesterID).First(&semesters); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semester not found"})
		return
	}

	// 14: สร้าง Withdrawal
	wd := entity.Withdrawal{
		Student:        students,                   // โยงความสัมพันธ์กับ Entity Student
		RegisCourse:    regiscourse,                // โยงความสัมพันธ์กับ Entity RegisCourse
		Teacher:        teachers,                   // โยงความสัมพันธ์กับ Entity Teacher
		Semester:       semesters,                  // โยงความสัมพันธ์กับ Entity Semester
		YearTime:       withdrawals.YearTime,       // ตั้งค่าฟิลด์ YearTime
		RemainCredit:   withdrawals.RemainCredit,   // ตั้งค่าฟิลด์ RemainCredit
		Reason:         withdrawals.Reason,         // ตั้งค่าฟิลด์ Reason
		WithdrawalTime: withdrawals.WithdrawalTime, // ตั้งค่าฟิลด์ WihdrawalTime
	}

	// แทรกการ validate ข้อมูล
	if _, err := govalidator.ValidateStruct(wd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&wd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wd})
}

// GET /withdrawals/:id
func GetWithdrwal(c *gin.Context) {
	var withdrawals entity.Withdrawal
	id := c.Param("id")
	if err := entity.DB().Preload("Student").Preload("RegisCourse").Preload("Teacher").Preload("Semester").Raw("SELECT * FROM withdrawals WHERE student_id = ? ", id).Find(&withdrawals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": withdrawals})
}

// GET /withdrawals
func ListWithdrawals(c *gin.Context) {
	var withdrawals []entity.Withdrawal
	if err := entity.DB().Preload("Student").Preload("RegisCourse").Preload("Teacher").Preload("Semester").Raw("SELECT * FROM withdrawals ").Find(&withdrawals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": withdrawals})
}

// GET /withdrawals
func ListWithdrawal(c *gin.Context) {
	var withdrawals []entity.Withdrawal
	id := c.Param("id")
	if err := entity.DB().Preload("Student").Preload("RegisCourse.Course").Preload("Teacher").Preload("Semester").Raw("SELECT * FROM withdrawals where student_id = ? ", id).Find(&withdrawals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": withdrawals})
}

// DELETE /return_ods/:id
func DeleteWithdrawal(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM withdrawals WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "withdrawal not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /return_ods
func UpdateWithdrawal(c *gin.Context) {
	var withdrawal entity.Withdrawal
	if err := c.ShouldBindJSON(&withdrawal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", withdrawal.ID).First(&withdrawal); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "withdrawal not found"})
		return
	}

	if err := entity.DB().Save(&withdrawal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": withdrawal})
}
