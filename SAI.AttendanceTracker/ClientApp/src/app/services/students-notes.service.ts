import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cacheable, ID } from '@datorama/akita';
import { AkitaFiltersPlugin } from 'akita-filters-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap, filter } from "rxjs/operators";
import { StudentNote, StudentsNotesQuery, StudentsNotesState, StudentsNotesStore } from '../states/students-notes';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class StudentsNotesService {

  private initialLoad: boolean = false;
  private studentsNotesFilterQuery: AkitaFiltersPlugin<StudentsNotesState>;

  constructor(
    private studentsService: StudentsService,
    private studentsNotesStore: StudentsNotesStore,
    private studentsNotesQuery: StudentsNotesQuery) {

    this.studentsNotesFilterQuery = new AkitaFiltersPlugin(this.studentsNotesQuery);
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

    if (!!studentNote.isPinned) {

      let item = this.studentsNotesQuery.getEntity(id) as StudentNote;
      this.studentsService.update(item.studentId, { note: item.note });
    }
  }

  remove(id: ID) {

    let item = this.studentsNotesQuery.getEntity(id) as StudentNote;

    if (!!item.isPinned) {

      this.studentsService.update(item.studentId, { note: '' });
    }

    this.studentsNotesStore.remove(id);
  }

}
