package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// GET /registrars
// List all registrars
func ListRegistrar(c *gin.Context) {
	var registrars []entity.Registrar
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM registrars where id = ? ", id).Scan(&registrars).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registrars})
}

// GET /registrar/:id
// Get registrar by id
func GetRegistrar(c *gin.Context) {
	var registrars entity.Registrar
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM registrars WHERE id = ?", id).Scan(&registrars).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registrars})
}

// POST /registrars
func CreateRegistrar(c *gin.Context) {
	var registrars entity.Registrar
	if err := c.ShouldBindJSON(&registrars); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&registrars).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registrars})
}

// PATCH /registrars
func UpdateRegistrar(c *gin.Context) {
	var registrars entity.Registrar
	if err := c.ShouldBindJSON(&registrars); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&registrars).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registrars})
}

// DELETE /registrars/:id
func DeleteRegistrar(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM registrars WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "registrar not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
