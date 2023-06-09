import { Attendance } from "../attendance/attendance";
import { Note } from "../notes/note";

export interface Student {
    studentID: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    notes: Note[],
    attendances: Attendance[],
    pinnedNoteId: number,
    userId: number,
    status: string
}