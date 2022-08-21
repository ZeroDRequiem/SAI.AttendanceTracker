import { EntityState } from "@datorama/akita";
import { Attendence } from "../enums/attendence";

export interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}
