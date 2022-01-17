import { CoursesInterface } from "./ICourse";
import { ExamTypesInterface } from "./IExamType";
import { SemestersInterface } from "./ISemester";

export interface ExamScheduleInterface {
    ID: number,
    AcamedicYeear : number,
    RoomExam: string,
    DateExam: Date,
    StartTime: TimeRanges,
    EndTime: TimeRanges,
    SemesterID: number,
    Semester: SemestersInterface,
    ExamTypeID: number,
    ExamType: ExamTypesInterface,
    CourseID: number,
    Course: CoursesInterface,
  }