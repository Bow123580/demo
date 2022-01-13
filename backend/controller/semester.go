package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /Semesters
func CreateSemester(c *gin.Context) {
	var Semester entity.Semester
	if err := c.ShouldBindJSON(&Semester); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Semester).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Semester})
}

// GET /Semester/:id
func GetSemester(c *gin.Context) {
	var Semester entity.Semester
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM semesters WHERE id = ?", id).Scan(&Semester).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Semester})
}

// GET /Semesters
func ListSemesters(c *gin.Context) {
	var Semesters []entity.Semester
	if err := entity.DB().Raw("SELECT * FROM semesters").Scan(&Semesters).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Semesters})
}

// DELETE /Semesters/:id
func DeleteSemester(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM semesters WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semester not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Semesters
func UpdateSemester(c *gin.Context) {
	var Semester entity.Semester
	if err := c.ShouldBindJSON(&Semester); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Semester.ID).First(&Semester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semester not found"})
		return
	}

	if err := entity.DB().Save(&Semester).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Semester})
}
