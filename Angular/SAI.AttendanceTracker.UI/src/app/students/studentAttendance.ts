export interface StudentAttendance {
    studentID: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    pinnedNoteId?: number,
    userId: number,
    status: string
}