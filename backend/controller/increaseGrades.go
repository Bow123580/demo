package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /IncreaseGrades
func CreateIncreaseGrades(c *gin.Context) {

	var IncreaseGrades entity.IncreaseGrades
	var Grades entity.Grades
	var Student entity.Student
	var Course entity.Course

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร IncreaseGrades
	if err := c.ShouldBindJSON(&IncreaseGrades); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา Course ด้วย id
	if tx := entity.DB().Where("id = ?", IncreaseGrades.CourseID).First(&Course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	// 10: ค้นหา Student ด้วย id
	if tx := entity.DB().Where("id = ?", IncreaseGrades.StudentID).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	// 11: ค้นหา Grades ด้วย id
	if tx := entity.DB().Where("id = ?", IncreaseGrades.GradesID).First(&Grades); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Grades not found"})
		return
	}
	// 12: สร้าง IncreaseGrades
	pm := entity.IncreaseGrades{
		Grades:  Grades,  // โยงความสัมพันธ์กับ Entity Semester
		Course:  Course,  // โยงความสัมพันธ์กับ Entity Course
		Student: Student, // โยงความสัมพันธ์กับ Entity ExamType
		Date:    IncreaseGrades.Date,
		Credit:  IncreaseGrades.Credit,
		Description:  IncreaseGrades.Description,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})
}

// GET /IncreaseGrades/:id
func GetIncreaseGrades(c *gin.Context) {
	var IncreaseGrades entity.IncreaseGrades
	id := c.Param("id")
	if err := entity.DB().Preload("Grades").Preload("Student").Preload("Course").Raw("SELECT * FROM increase_grades WHERE id = ?", id).Find(&IncreaseGrades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": IncreaseGrades})
}

// GET /IncreaseGrades
func ListIncreaseGrades(c *gin.Context) {
	var IncreaseGrades []entity.IncreaseGrades
	if err := entity.DB().Preload("Student").Preload("Course").Preload("Grades").Raw("SELECT * FROM increase_grades ").Find(&IncreaseGrades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": IncreaseGrades})
}

// DELETE /IncreaseGrades/:id
func DeleteIncreaseGrades(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM increase_grades WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IncreaseGrades not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /IncreaseGrades
func UpdateIncreaseGrades(c *gin.Context) {
	var IncreaseGrades entity.IncreaseGrades
	if err := c.ShouldBindJSON(&IncreaseGrades); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", IncreaseGrades.ID).First(&IncreaseGrades); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IncreaseGrades not found"})
		return
	}

	if err := entity.DB().Save(&IncreaseGrades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": IncreaseGrades})
}
