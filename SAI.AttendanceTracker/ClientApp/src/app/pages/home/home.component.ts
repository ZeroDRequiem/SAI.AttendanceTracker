import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ID } from '@datorama/akita';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { StudentsService } from '../../services/students.service';
import { StudentsDataSource } from './students-data-source';
import { Attendance, Style } from '../../enums';
import { Student, StudentsQuery } from '../../states/students';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogData } from '../../components/alert-dialog';
import { StudentFormDialogComponent } from '../../components/student-form-dialog/student-form-dialog.component';
import { StudentFormDialogData } from '../../components/student-form-dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Student>;
  selection = new SelectionModel<Student>(true, []);


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'lastName', 'firstName', 'middleName', 'attendance', 'note'];
  dataSource: StudentsDataSource;
  date$ = new BehaviorSubject<Date>(new Date());

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private studentsService: StudentsService,
    private studentsQuery: StudentsQuery) {

    this.dataSource = new StudentsDataSource(this.studentsQuery);
  }

  ngOnInit(): void {

    this.studentsService.get().subscribe();
  }

  ngAfterViewInit(): void {

    this.dataSource.setSortListener(this.sort);
    this.table.dataSource = this.dataSource;
  }

  studentAttendance_onClick(student: Student) {

    let attendance = student.attendance;

    switch (attendance) {
      case Attendance.None:
        attendance = Attendance.Present;
        break;
      case Attendance.Present:
        attendance = Attendance.Absent;
        break;
      case Attendance.Absent:
        attendance = Attendance.Excused;
        break;
      case Attendance.Excused:
        attendance = Attendance.None;
        break;
    }

    this.studentsService.update(student.id, { attendance: attendance })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data?.length ?? 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource?.data ?? []);
  }


  filterText_Changed(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.setFilterText(filterValue);
  }

  private clickCount: number = 0;
  selectStudent_RowClick(studentId: ID): void {

    this.clickCount++;
    setTimeout(() => {
      if (this.clickCount === 1) {
        // single
      } else if (this.clickCount >= 1) {
        // double
        this.router.navigate([`/students/${studentId}/notes`]);
      }
      this.clickCount = 0;
    }, 250);
  }

  refreshStudent_ButtonClick(): void {

    this.studentsService.get(true).subscribe();
  }

  addStudent_ButtonClick(): void {

    this.dialog
      .open(StudentFormDialogComponent)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        tap(() => this.selection.clear()))
      .subscribe(result => {

        this.studentsService.add(result);
      });
  }

  editStudent_ButtonClick(): void {

    let student = this.selection.selected[0];
    let dialogData: StudentFormDialogData = {
      ...student
    };

    this.dialog
      .open(StudentFormDialogComponent, {
        data: dialogData
      })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        tap(() => this.selection.clear()))
      .subscribe(result => {

        this.studentsService.update(student.id, result);
      });
  }

  deleteStudent_ButtonClick(): void {

    let dialogData: AlertDialogData = {
      title: `Delete student${this.selection.selected.length > 1 ? 's' : ''}`,
      description: "Are you sure you want to delete?",
      confirmText: "Delete",
      confirmStyle: Style.Warn
    };

    this.dialog
      .open(AlertDialogComponent, {
        data: dialogData
      })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        tap(() => this.selection.clear()))
      .subscribe(() => {

        for (let student of this.selection.selected) {

          this.studentsService.remove(student.id);
        }
      });
  }
}
