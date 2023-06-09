import { Student } from "../students/student";

export interface Attendance
{
    attendanceId: number,
    studentId: number,
    student: Student,
    status: string,
    date: Date
}