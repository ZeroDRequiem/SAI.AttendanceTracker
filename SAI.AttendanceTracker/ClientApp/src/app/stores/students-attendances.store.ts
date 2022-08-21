import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StudentAttendance } from '../models/student-attendance';

export interface StudentsAttendancesState extends EntityState<StudentAttendance> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'StudentsAttendances' })
export class StudentsAttendancesStore extends EntityStore<StudentsAttendancesState> {

  constructor() {
    super();
  }

}
