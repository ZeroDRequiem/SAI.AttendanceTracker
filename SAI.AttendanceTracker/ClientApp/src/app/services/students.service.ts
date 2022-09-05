import { Injectable } from '@angular/core';
import { ID, cacheable } from '@datorama/akita';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { Student, StudentsQuery, StudentsStore } from '../states/students';

@Injectable({ providedIn: 'root' })
export class StudentsService {

  private initialLoad: boolean = false;

  constructor(
    private studentsStore: StudentsStore,
    private studentsQuery: StudentsQuery
  ) {
  }

  get(forceLoad: boolean = false): Observable<Student[]> {

    if (this.initialLoad || forceLoad) {

      // TODO: make httpCall
      this.initialLoad = true;
    }

    return this.studentsQuery.selectAll();
  }

  getById(id: ID, forceLoad: boolean = false): Observable<Student> {

    if (this.initialLoad || forceLoad) {


      // TODO: make httpCall
      this.initialLoad = true;
    }

    return this.studentsQuery.selectEntity(id).pipe(map(entity => entity as Student));
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
