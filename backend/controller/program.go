package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /Program
func CreateProgram(c *gin.Context) {
	var Program entity.Program
	if err := c.ShouldBindJSON(&Program); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Program).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Program})
}

// GET /Program/:id
func GetProgram(c *gin.Context) {
	var Program entity.Program
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM programs WHERE id = ?", id).Scan(&Program).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Program})
}

// GET /Programs
func ListPrograms(c *gin.Context) {
	var Programs []entity.Program
	if err := entity.DB().Raw("SELECT * FROM programs").Scan(&Programs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Programs})
}

// DELETE /Programs/:id
func DeleteProgram(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM programs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Programs
func UpdateProgram(c *gin.Context) {
	var Program entity.Program
	if err := c.ShouldBindJSON(&Program); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Program.ID).First(&Program); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	if err := entity.DB().Save(&Program).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Program})
}
