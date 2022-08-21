import { Note } from "../enums/note";

export interface StudentNote {
  id: string;
  studentId: string;
  note: string;
  type: Note;
  date: Date;
  isPinned: boolean;
}
