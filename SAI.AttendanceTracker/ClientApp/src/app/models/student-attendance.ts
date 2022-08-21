import { EntityState } from "@datorama/akita";
import { Attendence } from "../enums/attendence";

export interface StudentAttendance {
  id: string;
  studentId: string;
  attendance: Attendence;
  date: Date;
}
