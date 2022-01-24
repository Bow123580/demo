import { CoursesInterface } from "./ICourse";
import { ProgramsInterface } from "./IProgram";
import { TeachersInterface } from "./ITeacher";

export interface AddCoursesInterface {
    ID: number,
    Credit: number,
    DayTime: string,
    SaveTime: Date,
    CourseID: number,
    Course: CoursesInterface,
    ProgramID: number,
    Program: ProgramsInterface,
    TeacherID: number,
    Teacher: TeachersInterface,
  }