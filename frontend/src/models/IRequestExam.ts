import { StudentsInterface } from "./IStudent";
import { SemestersInterface } from "./ISemester";
import { CoursesInterface } from "./ICourse";
import { TeachersInterface } from "./ITeacher";
import { RequestStatusesInterface } from "./IRequestStatus";

export interface RequestExamInterface {
  ID: number,
  StudentID: number,
  Student: StudentsInterface,
  SemesterID: number,
  Semester: SemestersInterface,
  AcademicYear: number,
  CourseID: number,
  Course: CoursesInterface,
  TeacherID: number,
  Teacher: TeachersInterface,
  Tel: string,
  RequestStatusID: number,
  RequestStatus: RequestStatusesInterface,
  RequestTime: Date,
}



