import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Student } from '../models/student';
import { StudentUI } from '../models/student-ui';

export interface StudentsState extends EntityState<Student> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Students' })
export class StudentsStore extends EntityStore<StudentsState> {

  constructor() {
    super();
  }
}
