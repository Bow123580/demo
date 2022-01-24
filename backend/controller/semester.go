package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /Course
func CreateSemester(c *gin.Context) {
	var semesters entity.Semester
	if err := c.ShouldBindJSON(&semesters); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&semesters).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": semesters})
}

// GET /Course/:id
func GetSemester(c *gin.Context) {
	var semesters entity.Semester
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM semesters WHERE id = ?", id).Scan(&semesters).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": semesters})
}

// GET /Courses
func ListSemester(c *gin.Context) {
	var semesters []entity.Semester
	if err := entity.DB().Raw("SELECT * FROM semesters").Scan(&semesters).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": semesters})
}

// DELETE /Courses/:id
func DeleteSemester(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM semesters WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semester not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Courses
func UpdateSemester(c *gin.Context) {
	var semesters entity.Semester
	if err := c.ShouldBindJSON(&semesters); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", semesters.ID).First(&semesters); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semester not found"})
		return
	}

	if err := entity.DB().Save(&semesters).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": semesters})
}
