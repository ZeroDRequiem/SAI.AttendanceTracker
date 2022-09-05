import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineQueries, ID } from '@datorama/akita';
import { throwError, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, mergeMap, tap } from 'rxjs/operators';
import { StudentsNotesService } from '../../services/students-notes.service';
import { StudentsService } from '../../services/students.service';
import { StudentNotesDataSource } from './student-notes-data-source';
import { StudentNote, StudentsNotesQuery } from '../../states/students-notes';
import { Student } from '../../states/students';

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss']
})
export class StudentNotesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentNote>;
  displayedColumns: string[] = ["selects", "notes", "createdDate", "actions"];

  private dataSource!: StudentNotesDataSource;
  public student$: BehaviorSubject<Student | undefined> = new BehaviorSubject<Student | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsNotesService: StudentsNotesService,
    private studentsNotesQuery: StudentsNotesQuery,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.studentsService.getById(id as string))
      )
      .subscribe(student => {

        this.student$.next(student);
        this.studentsNotesService.getNotesByStudentId(student.id).subscribe();
        this.dataSource = new StudentNotesDataSource(student.id, this.studentsNotesQuery);
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
}
