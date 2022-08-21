import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Student } from '../models/student';
import { StudentsStore } from '../stores/students.store';

@Injectable({ providedIn: 'root' })
export class StudentsService {

  static_data: Student[] = [
    { id: "0", firstName: 'Abdurrahman', lastName: 'Alatas' },
    { id: "1", firstName: 'Rizka', lastName: 'Soebandi' },
    { id: "2", firstName: 'Bianca', lastName: 'Cha' },
    { id: "3", firstName: 'Brian', lastName: 'Cha' },
    { id: "4", firstName: 'Abe 5', lastName: 'Alatas' },
    { id: "5", firstName: 'Abe 6', lastName: 'Alatas' }
  ];


  constructor(private studentsStore: StudentsStore) {
  }

  get(): Observable<Student[]> {
    return of(this.static_data)
      .pipe(
        tap(entities => {
          //this.studentsStore.set(entities);
          this.studentsStore.add(entities);
        })
      );
  }

  getById(id: string): Observable<Student> {
    return of(this.static_data.filter(student => student.id == id)[0])
      .pipe(
        switchMap(entity => {

          if (!entity) {
            return throwError("entity not found.");
          }

          return of(entity);
        }),
        tap(entity => {
          console.log('entity: ', entity);
          //this.studentsStore.set(entity);
          this.studentsStore.add(entity);
        })
      );
  }

  add(student: Student): void {
    this.studentsStore.add(student);
  }

  update(id: ID, student: Partial<Student>): void {
    this.studentsStore.update(id, student);
  }

  remove(id: ID): void {
    this.studentsStore.remove(id);
  }

}
