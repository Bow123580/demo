package main

import (
	"github.com/PhatSut/demo/controller"
	"github.com/PhatSut/demo/entity"
	"github.com/PhatSut/demo/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

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

			// Course Routes
			r.GET("/courses", controller.ListCourses)
			r.GET("/course/:id", controller.GetCourse)
			r.POST("/courses", controller.CreateCourse)
			r.PATCH("/courses", controller.UpdateCourse)
			r.DELETE("/courses/:id", controller.DeleteCourse)

			// Student Routes
			protected.GET("/students", controller.ListStudents)
			protected.GET("/students/:id", controller.ListStudent)
			protected.GET("/student/:id", controller.GetStudent)
			protected.PATCH("/students", controller.UpdateStudent)
			protected.DELETE("/students/:id", controller.DeleteStudent)

			// Teaher Routes
			protected.GET("/teachers/:id", controller.ListTeacher)
			protected.GET("/teacher/:id", controller.GetTeacher)
			protected.POST("/teacher", controller.CreateTeacher)
			protected.PATCH("/teachers", controller.UpdateTeacher)
			protected.DELETE("/teachers/:id", controller.DeleteTeacher)

			// Registrar Routes
			protected.GET("/registrars/:id", controller.ListRegistrar)
			protected.GET("/registrar/:id", controller.GetRegistrar)
			protected.POST("/registrar", controller.CreateRegistrar)
			protected.PATCH("/registrars", controller.UpdateRegistrar)
			protected.DELETE("/registrars/:id", controller.DeleteRegistrar)

			// examschedule Routes
			protected.GET("/examschedules", controller.ListExamSchedules)
			protected.GET("/examschedule/:id", controller.GetExamSchedule)
			protected.POST("/examschedules", controller.CreateExamSchedule)
			protected.PATCH("/examschedules", controller.UpdateExamSchedule)
			protected.DELETE("/examschedules/:id", controller.DeleteExamSchedule)

			// Withdrwals Routes
			protected.GET("/withdrwals", controller.ListWithdrawals)
			protected.GET("/withdrwals/:id", controller.ListWithdrawal)
			protected.GET("/withdrwal/:id", controller.GetWithdrwal)
			protected.POST("/withdrwal", controller.CreateWithdrawal)
			protected.PATCH("/withdrwals", controller.UpdateWithdrawal)
			protected.DELETE("/withdrwals/:id", controller.DeleteWithdrawal)
		}
	}

	// Student Routes
	r.POST("/students", controller.CreateStudent)

	// Authentication Routes
	r.POST("/student/login", controller.LoginStudent)
	r.POST("/registrar/login", controller.LoginRegistrar)

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
