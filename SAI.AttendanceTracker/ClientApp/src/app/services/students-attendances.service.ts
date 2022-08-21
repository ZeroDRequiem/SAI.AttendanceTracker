import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable, of, tap } from 'rxjs';
import { Attendence } from '../enums/attendence';
import { StudentAttendance } from '../models/student-attendance';
import { StudentsAttendancesStore } from '../stores/students-attendances.store';

@Injectable({
  providedIn: 'root'
})
export class StudentsAttendancesService {

  static_data: StudentAttendance[] = [
    { id: "0", studentId: "0", attendance: Attendence.None, date: new Date() },
    { id: "1", studentId: "1", attendance: Attendence.None, date: new Date() },
    { id: "2", studentId: "2", attendance: Attendence.None, date: new Date() },
    { id: "3", studentId: "3", attendance: Attendence.None, date: new Date() },
    { id: "4", studentId: "4", attendance: Attendence.None, date: new Date() },
    { id: "5", studentId: "5", attendance: Attendence.None, date: new Date() },
  ];

  constructor(private studentAttendancesStore: StudentsAttendancesStore) { }

  get(date: Date): Observable<StudentAttendance[]> {
    return of(this.static_data)
      .pipe(
        tap(entities => {
          this.studentAttendancesStore.set(entities);
        })
      );
  }

  add(student: StudentAttendance): void {
    this.studentAttendancesStore.add(student);
  }

  update(id: ID, studentAttendance: Partial<StudentAttendance>): void {
    this.studentAttendancesStore.update(id, studentAttendance);
  }

  remove(id: ID): void {
    this.studentAttendancesStore.remove(id);
  }
}
