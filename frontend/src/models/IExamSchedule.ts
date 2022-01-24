import { CoursesInterface } from "./ICourse";
import { ExamTypesInterface } from "./IExamType";
import { SemestersInterface } from "./ISemester";

export interface ExamScheduleInterface {
    ID: number,
    AcamedicYear : number,
    RoomExam: string,
    DateExam: Date,
    StartTime: Date,
    EndTime: Date,
    SemesterID: number,
    Semester: SemestersInterface,
    ExamTypeID: number,
    ExamType: ExamTypesInterface,
    CourseID: number,
    Course: CoursesInterface,
  }