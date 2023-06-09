import { Student } from "../students/student"

export interface Note
{
    noteId: number,
    type?: string,
    content: string,
    studentId: number,
    student: Student
    created: Date
}