import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StudentsNotesStore, StudentsNotesState } from './students-notes.store';

@Injectable({ providedIn: 'root' })
export class StudentsNotesQuery extends QueryEntity<StudentsNotesState> {

  constructor(protected override store: StudentsNotesStore) {
    super(store);
  }

}
