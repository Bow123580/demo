package main

import (
	"github.com/PhatSut/demo/controller"
	"github.com/PhatSut/demo/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	

			// Semester Routes
			r.GET("/semesters", controller.ListSemesters)
			r.GET("/semester/:id", controller.GetSemester)
			r.POST("/semesters", controller.CreateSemester)
			r.PATCH("/semesters", controller.UpdateSemester)
			r.DELETE("/semesters/:id", controller.DeleteSemester)

			// ExamType Routes
			r.GET("/examtypes", controller.ListExamTypes)
			r.GET("/examtype/:id", controller.GetExamType)
			r.POST("/examtypes", controller.CreateExamType)
			r.PATCH("/examtypes", controller.UpdateExamType)
			r.DELETE("/examtypes/:id", controller.DeleteExamType)			
		

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
