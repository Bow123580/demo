import { CoursesInterface } from "./ICourse";
import { SemestersInterface } from "./ISemester";
import { StudentsInterface } from "./IStudent";
import { TeachersInterface } from "./ITeacher";

export interface WithdrawalsInterface {
    ID: number,
    StudentID: number,
    Student: StudentsInterface,
    CourseID: number,
    Course: CoursesInterface,
    TeacherID: number,
    Teacher: TeachersInterface,
    SemesterID: number,
    Semester: SemestersInterface,
    YearTime: number,
    RemainCredit: number,
    Reason: string,
    WithdrawalTime: Date,
}