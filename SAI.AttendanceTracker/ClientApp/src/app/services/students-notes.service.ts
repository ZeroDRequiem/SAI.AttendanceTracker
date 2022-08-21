import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs';
import { StudentNote } from '../models/student-note';
import { StudentsNotesStore } from '../stores/students-notes.store';

@Injectable({ providedIn: 'root' })
export class StudentsNotesService {

  constructor(private studentNoteStore: StudentsNotesStore) {
  }


  getPinnedNotes() {
    //return this.http.get<StudentNote[]>('https://api.com').pipe(tap(entities => {
    //  this.studentNoteStore.set(entities);
    //}));
  }

  getNotesByStudentId(studentId: string) {
    //return this.http.get<StudentNote[]>('https://api.com').pipe(tap(entities => {
    //  this.studentNoteStore.set(entities);
    //}));
  }

  add(studentNote: StudentNote) {
    this.studentNoteStore.add(studentNote);
  }

  update(id: ID, studentNote: Partial<StudentNote>) {
    this.studentNoteStore.update(id, studentNote);
  }

  remove(id: ID) {
    this.studentNoteStore.remove(id);
  }

}
