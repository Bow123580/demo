package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /record_petitions
func CreateRecordPetition(c *gin.Context) {

	var recordpetition entity.RecordPetition
	var student entity.Student
	var petition entity.Petition
	var course entity.Course

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร recordpetition
	if err := c.ShouldBindJSON(&recordpetition); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา student ด้วย id
	if tx := entity.DB().Where("id = ?", recordpetition.StudentID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	// 10: ค้นหา petition ด้วย id
	if tx := entity.DB().Where("id = ?", recordpetition.PetitionID).First(&petition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "petition not found"})
		return
	}

	// 11: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", recordpetition.CourseID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	// 12: สร้าง RecordPetition
	rp := entity.RecordPetition{
		Student:  		student,             // โยงความสัมพันธ์กับ Entity Student
		Petition:       petition,                  // โยงความสัมพันธ์กับ Entity Petition
		Course:    		course,               // โยงความสัมพันธ์กับ Entity Course
		TimeRecord: 	recordpetition.TimeRecord, // ตั้งค่าฟิลด์ TimeRecord
		Because: 		recordpetition.Because,
		RegisteredCredit: recordpetition.RegisteredCredit,	
	}

	// 13: บันทึก
	if err := entity.DB().Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rp})
}

// GET /recordpetition/:id
func GetRecordPetition(c *gin.Context) {
	var recordpetition entity.RecordPetition
	id := c.Param("id")
	if err := entity.DB().Preload("Student").Preload("Petition").Preload("Course").Raw("SELECT * FROM record_petitions WHERE id = ?", id).Find(&recordpetition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": recordpetition})
}

// GET /record_petitions
func ListRecordPetitions(c *gin.Context) {
	var recordpetitions []entity.RecordPetition
	if err := entity.DB().Preload("Student").Preload("Petition").Preload("Course").Raw("SELECT * FROM record_petitions").Find(&recordpetitions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recordpetitions})
}

// DELETE /record_petitions/:id
func DeleteRecordPetition(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM record_petitions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recordpetition not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /record_petitions
func UpdateRecordPetition(c *gin.Context) {
	var recordpetition entity.RecordPetition
	if err := c.ShouldBindJSON(&recordpetition); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", recordpetition.ID).First(&recordpetition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recordpetition not found"})
		return
	}

	if err := entity.DB().Save(&recordpetition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recordpetition})
}