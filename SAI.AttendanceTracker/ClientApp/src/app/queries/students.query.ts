import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { StudentsState, StudentsStore } from '../stores/students.store';

@Injectable({ providedIn: 'root' })
export class StudentsQuery extends QueryEntity<StudentsState> {

  constructor(protected override store: StudentsStore) {
    super(store);
  }
}
