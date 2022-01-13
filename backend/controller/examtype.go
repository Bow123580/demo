package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /ExamTypes
func CreateExamType(c *gin.Context) {
	var ExamType entity.ExamType
	if err := c.ShouldBindJSON(&ExamType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&ExamType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ExamType})
}

// GET /ExamType/:id
func GetExamType(c *gin.Context) {
	var ExamType entity.ExamType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM exam_types WHERE id = ?", id).Scan(&ExamType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ExamType})
}

// GET /ExamTypes
func ListExamTypes(c *gin.Context) {
	var ExamTypes []entity.ExamType
	if err := entity.DB().Raw("SELECT * FROM exam_types").Scan(&ExamTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ExamTypes})
}

// DELETE /ExamTypes/:id
func DeleteExamType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM exam_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ExamType not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ExamTypes
func UpdateExamType(c *gin.Context) {
	var ExamType entity.ExamType
	if err := c.ShouldBindJSON(&ExamType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", ExamType.ID).First(&ExamType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ExamType not found"})
		return
	}

	if err := entity.DB().Save(&ExamType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ExamType})
}
