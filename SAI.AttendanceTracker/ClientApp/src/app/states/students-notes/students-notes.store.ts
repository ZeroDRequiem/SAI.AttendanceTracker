import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StudentNote } from './student-note.model';

export interface StudentsNotesState extends EntityState<StudentNote> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'StudentsNotes' })
export class StudentsNotesStore extends EntityStore<StudentsNotesState> {

  static_data: StudentNote[] = [
    { id: "0", studentId: "0", date: new Date(2022, 8, 21), note: "This is a note 1.", isPinned: true },
    { id: "1", studentId: "0", date: new Date(2022, 8, 20), note: "This is a note 2.", isPinned: false },
    { id: "2", studentId: "0", date: new Date(2022, 8, 19), note: "This is a note 3.", isPinned: false },
    { id: "3", studentId: "0", date: new Date(2022, 8, 18), note: "This is a note 4.", isPinned: false },
  ];

  constructor() {
    super();

    this.set(this.static_data);
  }

}
