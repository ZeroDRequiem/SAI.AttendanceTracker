import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StudentsAttendancesState, StudentsAttendancesStore } from '../stores/students-attendances.store';

@Injectable({ providedIn: 'root' })
export class StudentsAttendancesQuery extends QueryEntity<StudentsAttendancesState> {

  constructor(protected override store: StudentsAttendancesStore) {
    super(store);
  }
}
