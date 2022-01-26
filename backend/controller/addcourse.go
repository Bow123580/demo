package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /AddCourses
func CreateAddCourse(c *gin.Context) {

	var Course entity.Course
	var Program entity.Program
	var Teacher entity.Teacher
	var AddCourse entity.AddCourse

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร AddCourse
	if err := c.ShouldBindJSON(&AddCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา Course ด้วย id
	if tx := entity.DB().Where("id = ?", AddCourse.CourseID).First(&Course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return 
	} 
  
	
	// 10: ค้นหา Program ด้วย id
	if tx := entity.DB().Where("id = ?", AddCourse.ProgramID).First(&Program); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semester not found"})
		return
	}

	// 11: ค้นหา Teacher ด้วย id
	if tx := entity.DB().Where("id = ?", AddCourse.TeacherID).First(&Teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ExamType not found"})
		return
	}
	// 12: สร้าง AddCourse
	ac := entity.AddCourse{
		Course:   Course,  // โยงความสัมพันธ์กับ Entity Course
		Program:  Program, // โยงความสัมพันธ์กับ Entity Program
		Teacher:  Teacher, // โยงความสัมพันธ์กับ Entity Teacher
		Credit: AddCourse.Credit,
		DayTime: AddCourse.DayTime,
		SaveTime: AddCourse.SaveTime,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac})
}

// GET /AddCourse/:id
func GetAddCourse(c *gin.Context) {
	var AddCourse entity.AddCourse
	id := c.Param("id")
	if err := entity.DB().Preload("Course").Preload("Program").Preload("Teacher").Raw("SELECT * FROM add_courses WHERE id = ?", id).Find(&AddCourse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": AddCourse})
}

// GET /AddCourse
func ListAddCourses(c *gin.Context) {
	var AddCourses []entity.AddCourse
	if err := entity.DB().Preload("Course").Preload("Program").Preload("Teacher").Raw("SELECT * FROM add_courses").Find(&AddCourses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": AddCourses})
}

// DELETE /AddCourses/:id
func DeleteAddCourse(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM add_courses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AddCourse not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /AddCourses
func UpdateAddCourse(c *gin.Context) {
	var AddCourse entity.AddCourse
	if err := c.ShouldBindJSON(&AddCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", AddCourse.ID).First(&AddCourse); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AddCourse not found"})
		return
	}

	if err := entity.DB().Save(&AddCourse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": AddCourse})
}
