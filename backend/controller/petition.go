package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/PhatSut/demo/entity"
)

// POST /petitions
func CreatePetition(c *gin.Context) {
	var petition entity.Petition
	if err := c.ShouldBindJSON(&petition); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&petition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": petition})
}

// GET /petition/:id
func GetPetition(c *gin.Context) {
	var petition entity.Petition
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM petitions WHERE id = ?", id).Scan(&petition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": petition})
}

// GET /petitions
func ListPetitions(c *gin.Context) {
	var petitions []entity.Petition
	if err := entity.DB().Raw("SELECT * FROM petitions").Scan(&petitions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": petitions})
}

// DELETE /petitions/:id
func DeletePetition(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM petitions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "petition not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /petitionห
func UpdatePetition(c *gin.Context) {
	var petition entity.Petition
	if err := c.ShouldBindJSON(&petition); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", petition.ID).First(&petition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	if err := entity.DB().Save(&petition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": petition})
}
