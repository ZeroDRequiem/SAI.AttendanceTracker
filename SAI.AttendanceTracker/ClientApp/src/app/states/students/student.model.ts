import { Attendance } from "../../enums";

export interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  attendance: Attendance;
  note?: string;
}
