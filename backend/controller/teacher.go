package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// GET /teachers
// List all teachers
func ListTeacher(c *gin.Context) {
	var teachers []entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM teachers where id = ? ", id).Scan(&teachers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

// GET /teacher/:id
// Get teacher by id
func GetTeacher(c *gin.Context) {
	var teachers entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM teachers WHERE id = ?", id).Scan(&teachers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

// POST /teachers
func CreateTeacher(c *gin.Context) {
	var teachers entity.Teacher
	if err := c.ShouldBindJSON(&teachers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

// PATCH /teachers
func UpdateTeacher(c *gin.Context) {
	var teachers entity.Teacher
	if err := c.ShouldBindJSON(&teachers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", teachers.ID).First(&teachers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	if err := entity.DB().Save(&teachers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

// DELETE /teachers/:id
func DeleteTeacher(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM teachers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
