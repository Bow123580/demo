import { CoursesInterface } from "./ICourse";
import { PetitionsInterface } from "./IPettition";
import { StudentsInterface } from "./IStudent";


export interface RecordPetitionInterface {
    ID: number,
	Because:            string,
	RegisteredCredit:   number,
	TimeRecord:         Date,
    
    StudentID:          number,
    Student:            StudentsInterface,
    
    PetitionID:         number,
    Petition:           PetitionsInterface,
    
    CourseID:           number,
    Course:             CoursesInterface,

}

