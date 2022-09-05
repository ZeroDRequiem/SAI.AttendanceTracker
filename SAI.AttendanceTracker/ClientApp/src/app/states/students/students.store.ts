import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Attendance } from '../../enums';
import { Student } from './student.model';

export interface StudentsState extends EntityState<Student> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Students' })
export class StudentsStore extends EntityStore<StudentsState> {

  static_data: Student[] = [
    { id: "0", firstName: 'Abdurrahman', lastName: 'Alatas', attendance: Attendance.None },
    { id: "1", firstName: 'Rizka', lastName: 'Soebandi', attendance: Attendance.None },
    { id: "2", firstName: 'Bianca', lastName: 'Cha', attendance: Attendance.None },
    { id: "3", firstName: 'Brian', lastName: 'Cha', attendance: Attendance.None },
    { id: "4", firstName: 'Abe 5', lastName: 'Alatas', attendance: Attendance.None },
    { id: "5", firstName: 'Abe 6', lastName: 'Alatas', attendance: Attendance.None }
  ];

  constructor() {
    super();

    this.set(this.static_data);
  }
}
