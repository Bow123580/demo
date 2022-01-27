package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /Grades
func CreateGrades(c *gin.Context) {
	var Grades entity.Grades
	if err := c.ShouldBindJSON(&Grades); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Grades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Grades})
}

// GET /Grades/:id
func GetGrades(c *gin.Context) {
	var Grades entity.Grades
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM grades WHERE id = ?", id).Scan(&Grades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Grades})
}

// GET /Grades
func ListGrades(c *gin.Context) {
	var Grades []entity.Grades
	if err := entity.DB().Raw("SELECT * FROM grades").Scan(&Grades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Grades})
}

// DELETE /Grades/:id
func DeleteGrades(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM grades WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Grades not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Grades
func UpdateGrades(c *gin.Context) {
	var Grades entity.Grades
	if err := c.ShouldBindJSON(&Grades); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Grades.ID).First(&Grades); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Grades not found"})
		return
	}

	if err := entity.DB().Save(&Grades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Grades})
}