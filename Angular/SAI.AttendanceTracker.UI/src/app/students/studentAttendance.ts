export interface StudentAttendance {
    studentID: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    pinnedNoteID?: number,
    userId: number,
    status: string
    attendanceID: number
}