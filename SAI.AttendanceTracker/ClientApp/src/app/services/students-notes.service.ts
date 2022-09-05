import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cacheable, ID } from '@datorama/akita';
import { AkitaFiltersPlugin } from 'akita-filters-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from "rxjs/operators";
import { StudentNote, StudentsNotesQuery, StudentsNotesState, StudentsNotesStore } from '../states/students-notes';

@Injectable({ providedIn: 'root' })
export class StudentsNotesService {

  private initialLoad: boolean = false;
  private studentsNotesFilterQuery: AkitaFiltersPlugin<StudentsNotesState>;

  constructor(private studentsNotesStore: StudentsNotesStore, private studentsNotesQuery: StudentsNotesQuery) {

    this.studentsNotesFilterQuery = new AkitaFiltersPlugin(studentsNotesQuery);
  }

  getNotesByStudentId(studentId: string, forceLoad: boolean = false): Observable<StudentNote[]> {

    if (!this.initialLoad || forceLoad) {

      // TODO: make httpCall
      this.initialLoad = true;
    }

    this.studentsNotesFilterQuery.setFilter({
      id: "studentId",
      value: studentId,
      predicate: (entity, index, array) => entity.studentId == studentId
    });

    return this.studentsNotesFilterQuery.selectAllByFilters()
      .pipe(map(entities => entities as StudentNote[]));
  }

  add(studentNote: StudentNote) {
    this.studentsNotesStore.add(studentNote);
  }

  update(id: ID, studentNote: Partial<StudentNote>) {
    this.studentsNotesStore.update(id, studentNote);
  }

  remove(id: ID) {
    this.studentsNotesStore.remove(id);
  }

}
