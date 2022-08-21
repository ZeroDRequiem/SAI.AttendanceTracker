import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { StudentsQuery } from '../../queries/students.query';
import { StudentsService } from '../../services/students.service';
import { StudentsAttendancesService } from '../../services/students-attendances.service';
import { StudentsAttendancesQuery } from '../../queries/students-attendances.query';
import { StudentsDataSource } from './students-data-source';
import { Attendence } from '../../enums/attendence';
import { StudentsNotesQuery } from '../../queries/students-notes.query';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { StudentUI } from '../../models/student-ui';
import { StudentsNotesService } from '../../services/students-notes.service';

const ANOTHER_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentUI>;
  selection = new SelectionModel<StudentUI>(true, []);

  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','lastName', 'firstName', 'middleName', 'attendance', 'note'];
  dataSource: StudentsDataSource;
  date$ = new BehaviorSubject<Date>(new Date());

  constructor(
    private studentsService: StudentsService,
    private studentAttendancesService: StudentsAttendancesService,
    private studentNoteService: StudentsNotesService,
    private studentsQuery: StudentsQuery,
    private studentAttendancesQuery: StudentsAttendancesQuery,
    private studentNotesQuery: StudentsNotesQuery) {

    this.studentsService.get().subscribe();
    this.studentAttendancesService.get(new Date()).subscribe();
    //this.studentNoteService.getPinnedNotes().subscribe();

    this.dataSource = new StudentsDataSource(this.studentsQuery, this.studentAttendancesQuery, this.studentNotesQuery);
  }

  ngAfterViewInit(): void {

    this.dataSource.setSortListener(this.sort);
    this.table.dataSource = this.dataSource;
  }

  studentAttendance_onClick(student: StudentUI) {
            
    let attendance = student.attendance;
    
    switch (attendance) {
      case Attendence.None:
        attendance = Attendence.Present;
        break;
      case Attendence.Present:
        attendance = Attendence.Absent;
        break;
      case Attendence.Absent:
        attendance = Attendence.Excused;
        break;
      case Attendence.Excused:
        attendance = Attendence.None;
        break;
    }

    this.studentAttendancesService.update(student.studentAttendanceId, { attendance: attendance });
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


  applyFilterText(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.setFilterText(filterValue);
  }
}
