import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineQueries, ID } from '@datorama/akita';
import { throwError, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, filter, mergeMap, tap } from 'rxjs/operators';
import { StudentsNotesService } from '../../services/students-notes.service';
import { StudentsService } from '../../services/students.service';
import { StudentNotesDataSource } from './student-notes-data-source';
import { StudentNote, StudentsNotesQuery, StudentsNotesState } from '../../states/students-notes';
import { Student } from '../../states/students';
import { SelectionModel } from '@angular/cdk/collections';
import { MatRadioGroup, MAT_RADIO_GROUP } from '@angular/material/radio';
import { AkitaFiltersPlugin } from "akita-filters-plugin";
import { AlertDialogComponent, AlertDialogData } from '../../components/alert-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Style } from '../../enums';
import { StudentNoteFormDialogComponent, StudentNoteFormDialogData } from '../../components/student-note-form-dialog';


@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss']
})
export class StudentNotesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentNote>;


  public dataSource!: StudentNotesDataSource;
  public student$: BehaviorSubject<Student | undefined> = new BehaviorSubject<Student | undefined>(undefined);
  private _id: string | null = null;
  private _pinnedNote$: AkitaFiltersPlugin<StudentsNotesState>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private studentsNotesService: StudentsNotesService,
    private studentsNotesQuery: StudentsNotesQuery,
    private studentsService: StudentsService
  ) {

    this._pinnedNote$ = new AkitaFiltersPlugin<StudentsNotesState>(this.studentsNotesQuery);
    this._pinnedNote$.setFilter({
      id: "isPinned",
      value: true,
      predicate: (note, index, array) => note.isPinned
    });
  }

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        tap(id => this._id = id),
        switchMap(id => this.studentsService.getById(id as string))
      )
      .subscribe(student => {

        this._pinnedNote$.setFilter({
          id: "studentId",
          value: student.id,
          predicate: (note, index, array) => note.studentId == student.id
        });
        this.student$.next(student);
        this.studentsNotesService.getNotesByStudentId(student.id).subscribe();
        this.dataSource = new StudentNotesDataSource(
          student.id,
          this.studentsNotesQuery,
          ["select", "notes", "createdDate", "actions"]);
      },
        error => {

          // either there was no id specified in route, or api threw an error.
          // redirect to 404 page.
          console.error('error: ', error);
          this.router.navigate([`./not-found`]);
        });
  }

  ngAfterViewInit(): void {

    this.dataSource.setSortListener(this.sort);
    this.table.dataSource = this.dataSource;
  }

  filterText_Changed(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.setFilterText(filterValue);
  }

  pin_Changed(item: StudentNote): void {

    var notes = this._pinnedNote$.getAllByFilters() as StudentNote[];
    for (let note of notes) {

      this.studentsNotesService.update(note.id, { isPinned: false });
    }

    this.studentsNotesService.update(item.id, { isPinned: true });
  }

  refresh_ButtonClick(): void {

    this.dataSource.selection.clear();
    this.studentsNotesService.getNotesByStudentId(this._id as string, true).subscribe();
  }

  calendar_ButtonClick(): void {

    this.router.navigate([`/students/${this._id}/calendar`]);
  }

  add_ButtonClick(): void {

    this.dialog
      .open(StudentNoteFormDialogComponent)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        tap(() => this.dataSource.selection.clear()),
        map(result => {
          return {
            id: '',
            studentId: this._id as string,
            date: new Date(),
            note: result.note,
            isPinned: false
          };
        }))
      .subscribe(result => {

        this.studentsNotesService.add(result);
      });
  }

  edit_ButtonClick(): void {

    let item = this.dataSource.selection.selected[0];
    let dialogData: StudentNoteFormDialogData = {
      ...item
    };

    this.dialog
      .open(StudentNoteFormDialogComponent, {
        data: dialogData
      })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        tap(() => this.dataSource.selection.clear()))
      .subscribe(result => {

        this.studentsNotesService.update(item.id, result);
      });
  }

  delete_ButtonClick(): void {

    let dialogData: AlertDialogData = {
      title: `Delete note${this.dataSource.selection.selected.length > 1 ? 's' : ''}`,
      description: "Are you sure you want to delete?",
      confirmText: "Delete",
      confirmStyle: Style.Warn
    };

    this.dialog
      .open(AlertDialogComponent, {
        data: dialogData
      })
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {

        for (let item of this.dataSource.selection.selected) {

          this.studentsNotesService.remove(item.id);
        }

        this.dataSource.selection.clear();
      });
  }
}
