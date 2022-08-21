import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StudentNote } from '../models/student-note';

export interface StudentsNotesState extends EntityState<StudentNote> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'StudentsNotes' })
export class StudentsNotesStore extends EntityStore<StudentsNotesState> {

  constructor() {
    super();
  }

}
