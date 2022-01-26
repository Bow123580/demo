package controller

import (
	"net/http"

	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

// POST /request_statusescd c:\

func CreateRequestStatus(c *gin.Context) {

	var requeststatus entity.RequestStatus

	if err := c.ShouldBindJSON(&requeststatus); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&requeststatus).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": requeststatus})

}

// GET /requeststatus/:id

func GetRequestStatus(c *gin.Context) {

	var requeststatus entity.RequestStatus

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM request_statuses WHERE id = ?", id).Scan(&requeststatus).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": requeststatus})

}

// GET /request_statuses

func ListRequestStatuses(c *gin.Context) {

	var request_statuses []entity.RequestStatus

	if err := entity.DB().Raw("SELECT * FROM request_statuses").Scan(&request_statuses).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": request_statuses})

}

// DELETE /request_statuses/:id

func DeleteRequestStatus(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM request_statuses WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "requeststatus not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /request_statuses

func UpdateRequestStatus(c *gin.Context) {

	var requeststatus entity.RequestStatus

	if err := c.ShouldBindJSON(&requeststatus); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", requeststatus.ID).First(&requeststatus); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "requeststatus not found"})

		return

	}

	if err := entity.DB().Save(&requeststatus).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": requeststatus})

}
