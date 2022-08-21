import { Attendence } from "../enums/attendence";

export interface StudentUI {
  id: string;
  lastName: string;
  firstName: string;
  middleName?: string;

  studentAttendanceId: string;
  attendance: Attendence;
  note?: string;
}
