package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /request_exams
func CreateRequestExam(c *gin.Context) {

	var requestexam entity.RequestExam
	var student entity.Student
	var teacher entity.Teacher
	var semester entity.Semester
	var course entity.Course
	var requeststatus entity.RequestStatus

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร requestexam
	if err := c.ShouldBindJSON(&requestexam); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา student ด้วย id
	if tx := entity.DB().Where("id = ?", requestexam.StudentID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	// 12: ค้นหา semester ด้วย id
	if tx := entity.DB().Where("id = ?", requestexam.SemesterID).First(&semester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "semester not found"})
		return
	}

	// 13: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", requestexam.CourseID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// 14: ค้นหา teacher ด้วย id
	if tx := entity.DB().Where("id = ?", requestexam.TeacherID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	// 15: ค้นหา requeststatus ด้วย id
	if tx := entity.DB().Where("id = ?", requestexam.RequestStatusID).First(&requeststatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requeststatus not found"})
		return
	}

	// : สร้าง requestexam
	re := entity.RequestExam{
		Student:       student,                  // โยงความสัมพันธ์กับ Entity student
		Semester:      semester,                 // โยงความสัมพันธ์กับ Entity semester
		AcademicYear:  requestexam.AcademicYear, // ตั้งค่าฟิลด์ AcademicYear
		Course:        course,                   // โยงความสัมพันธ์กับ Entity course
		Teacher:       teacher,                  // โยงความสัมพันธ์กับ Entity teacher
		Tel:           requestexam.Tel,          // ตั้งค่าฟิลด์ Tel
		RequestStatus: requeststatus,            // โยงความสัมพันธ์กับ Entity requeststatus
		RequestTime:   requestexam.RequestTime,  // ตั้งค่าฟิลด์ RequestTime

	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(requestexam); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&re).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": re})
}

// GET /requestexam/:id
func GetRequestExam(c *gin.Context) {
	var requestexam entity.RequestExam
	id := c.Param("id")
	if err := entity.DB().Preload("Student").Preload("Semester").Preload("Course").Preload("Teacher").Preload("RequestStatus").Raw("SELECT * FROM request_exams WHERE id = ?", id).Find(&requestexam).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requestexam})
}

// GET /request_exams
func ListRequestExams(c *gin.Context) {
	var requestexams []entity.RequestExam
	if err := entity.DB().Preload("Student").Preload("Semester").Preload("Course").Preload("Teacher").Preload("RequestStatus").Raw("SELECT * FROM request_exams").Find(&requestexams).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestexams})
}

// DELETE /request_exams/:id
func DeleteRequestExam(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM request_exams WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestexam not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /request_exams
func UpdateRequestExam(c *gin.Context) {
	var requestexam entity.RequestExam
	if err := c.ShouldBindJSON(&requestexam); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", requestexam.ID).First(&requestexam); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestexam not found"})
		return
	}
	if err := entity.DB().Save(&requestexam).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requestexam})
}
