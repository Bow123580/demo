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
<<<<<<< HEAD
			// Student Routes
			protected.GET("/students", controller.ListStudents)
			protected.GET("/students/:id", controller.ListStudent)
			protected.GET("/student/:id", controller.GetStudent)
			protected.PATCH("/students", controller.UpdateStudent)
			protected.DELETE("/students/:id", controller.DeleteStudent)

			// Teaher Routes
			protected.GET("/teachers", controller.ListTeacher)
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
=======
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880

			// Semester Routes
			protected.GET("/semesters", controller.ListSemester)
			protected.GET("/semester/:id", controller.GetSemester)
			protected.POST("/semesters", controller.CreateSemester)
			protected.PATCH("/semesters", controller.UpdateSemester)
			protected.DELETE("/semesters/:id", controller.DeleteSemester)

			// ExamType Routes
<<<<<<< HEAD
			protected.GET("/examtypes", controller.ListExamTypes)
			protected.GET("/examtype/:id", controller.GetExamType)
			protected.POST("/examtypes", controller.CreateExamType)
			protected.PATCH("/examtypes", controller.UpdateExamType)
			protected.DELETE("/examtypes/:id", controller.DeleteExamType)

			// Course Routes
			protected.GET("/courses", controller.ListCourses)
			protected.GET("/course/:id", controller.GetCourse)
			protected.POST("/courses", controller.CreateCourse)
			protected.PATCH("/courses", controller.UpdateCourse)
			protected.DELETE("/courses/:id", controller.DeleteCourse)

			// AddCourse Routes
			protected.GET("/addcourses", controller.ListAddCourses)
			protected.GET("/addcourse/:id", controller.GetAddCourse)
			protected.POST("/addcourse", controller.CreateAddCourse)
			protected.PATCH("/addcourses", controller.UpdateAddCourse)
			protected.DELETE("/addcourses/:id", controller.DeleteAddCourse)

			// Program Routes
			protected.GET("/programs", controller.ListPrograms)
			protected.GET("/program/:id", controller.GetProgram)
			protected.POST("/programs", controller.CreateProgram)
			protected.PATCH("/programs", controller.UpdateProgram)
			protected.DELETE("/programs/:id", controller.DeleteProgram)

			// Withdrwals Routes
			protected.GET("/withdrawals", controller.ListWithdrawals)
			protected.GET("/withdrawals/:id", controller.ListWithdrawal)
			protected.GET("/withdrawal/:id", controller.GetWithdrwal)
			protected.POST("/withdrawal", controller.CreateWithdrawal)
			protected.PATCH("/withdrawals", controller.UpdateWithdrawal)
			protected.DELETE("/withdrawals/:id", controller.DeleteWithdrawal)

=======
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
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
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
