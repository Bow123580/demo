package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

func CreateWithdrawal(c *gin.Context) {

	var withdrawals entity.Withdrawal
	var students entity.Student
	var courses entity.Course
	var semesters entity.Semester
	var teachers entity.Teacher

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร withdrawals
	if err := c.ShouldBindJSON(&withdrawals); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา student ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.StudentID).First(&students); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	// 10: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.CourseID).First(&courses); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// 11: ค้นหา teacher ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.TeacherID).First(&teachers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	// 12: ค้นหา semester ด้วย id
	if tx := entity.DB().Where("id = ?", withdrawals.SemesterID).First(&semesters); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "semester not found"})
		return
	}
	// 13: สร้าง Withdrawal
	wd := entity.Withdrawal{
		Student:        students,                   // โยงความสัมพันธ์กับ Entity Student
		Course:         courses,                    // โยงความสัมพันธ์กับ Entity Course
		Teacher:        teachers,                   // โยงความสัมพันธ์กับ Entity Teacher
		Semester:       semesters,                  // โยงความสัมพันธ์กับ Entity Semester
		YearTime:       withdrawals.YearTime,       // ตั้งค่าฟิลด์ YearTime
		RemainCredit:   withdrawals.RemainCredit,   // ตั้งค่าฟิลด์ RemainCredit
		Reason:         withdrawals.Reason,         // ตั้งค่าฟิลด์ Reason
		WithdrawalTime: withdrawals.WithdrawalTime, // ตั้งค่าฟิลด์ WihdrawalTime
	}

	// 13: บันทึก
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
	if err := entity.DB().Preload("Student").Preload("Course").Preload("Teacher").Preload("Semester").Raw("SELECT * FROM withdrawals WHERE student_id = ? ", id).Find(&withdrawals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": withdrawals})
}

// GET /withdrawals
func ListWithdrawals(c *gin.Context) {
	var withdrawals []entity.Withdrawal
	if err := entity.DB().Preload("Student").Preload("Course").Preload("Teacher").Preload("Semester").Raw("SELECT * FROM withdrawals ").Find(&withdrawals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": withdrawals})
}

// GET /withdrawals
func ListWithdrawal(c *gin.Context) {
	var withdrawals []entity.Withdrawal
	id := c.Param("id")
	if err := entity.DB().Preload("Student").Preload("Course").Preload("Teacher").Preload("Semester").Raw("SELECT * FROM withdrawals where student_id = ? ", id).Find(&withdrawals).Error; err != nil {
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
