import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { combineQueries, Order } from '@datorama/akita';
import { StudentsAttendancesQuery } from "../../queries/students-attendances.query";
import { StudentsQuery } from "../../queries/students.query";
import { StudentsNotesQuery } from "../../queries/students-notes.query";
import { MatSort } from '@angular/material/sort';
import { AkitaFiltersPlugin, searchFilter, searchFilterIn } from 'akita-filters-plugin';
import { StudentsState } from '../../stores/students.store';
import { StudentsAttendancesState } from '../../stores/students-attendances.store';
import { StudentUI } from '../../models/student-ui';
import { StudentsNotesState } from '../../stores/students-notes.store';
import { Student } from '../../models/student';
import { StudentAttendance } from '../../models/student-attendance';
import { StudentNote } from '../../models/student-note';




export class StudentsDataSource extends DataSource<StudentUI> {

  private _dataStream = new ReplaySubject<StudentUI[]>();
  public data?: StudentUI[];

  private _studentsFilterQuery: AkitaFiltersPlugin<StudentsState>;
  private _studentsAttendanceFilterQuery: AkitaFiltersPlugin<StudentsAttendancesState>;
  private _studentsNotesFilterQuery: AkitaFiltersPlugin<StudentsNotesState>;


  constructor(
    studentsQuery: StudentsQuery,
    studentAttendanceQuery: StudentsAttendancesQuery,
    studentNotesQuery: StudentsNotesQuery) {

    super();

    this._studentsFilterQuery = new AkitaFiltersPlugin<StudentsState>(studentsQuery);
    this._studentsAttendanceFilterQuery = new AkitaFiltersPlugin<StudentsAttendancesState>(studentAttendanceQuery);
    this._studentsNotesFilterQuery = new AkitaFiltersPlugin<StudentsNotesState>(studentNotesQuery);

    this._studentsFilterQuery.selectAllByFilters().pipe(
      switchMap(students => {
        console.log('students running...');
        let studentsArray: Student[] = students as Student[];
        let studentIds: string[] = studentsArray.map(student => student.id);

        this._studentsAttendanceFilterQuery.setFilter({
          id: "studentId",
          value: studentIds,
          predicate: (studentAttendance, index, array) => studentIds.indexOf(studentAttendance.studentId) != -1
        });

        this._studentsNotesFilterQuery.setFilter({
          id: "studentId",
          value: studentIds,
          predicate: (studentNote, index, array) => studentIds.indexOf(studentNote.studentId) != -1
        });

        return combineQueries([
          of(studentsArray),
          this._studentsAttendanceFilterQuery.selectAllByFilters(),
          this._studentsNotesFilterQuery.selectAllByFilters(),
        ])
      }),
      map(([students, studentsAttendances, studentsNotes]) => {

        let studentUIs: StudentUI[] = [];
        let studentsAttendancesArray: StudentAttendance[] = studentsAttendances as StudentAttendance[];
        let studentsNotesArray: StudentNote[] = studentsNotes as StudentNote[];

        for (let student of students) {

          let studentAttendance = studentsAttendancesArray.filter(sa => sa.studentId == student.id)[0];
          let studentNote = studentsNotesArray.filter(sn => sn.studentId == student.id && sn.isPinned)[0];

          studentUIs.push({
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            middleName: student.middleName,

            studentAttendanceId: studentAttendance.id,
            attendance: studentAttendance.attendance,
            note: studentNote?.note
          });
        }

        return studentUIs;
      })
    ).subscribe(students => this.setData(students));
  }

  connect(): Observable<StudentUI[]> {

    return this._dataStream;
  }

  disconnect() { }

  setData(data: StudentUI[]) {

    this.data = data;
    this._dataStream.next(data);
  }

  setFilterText(filterText: string) {

    filterText = filterText.trim().toUpperCase();
    this._studentsFilterQuery.setFilter({
      id: "name",
      value: filterText,
      predicate: (student, index, array) => searchFilter(filterText, student)
    });
  }

  setSortListener(sort: MatSort) {

    sort.sortChange.subscribe(s => {

      console.log('direction: ', s.direction);
      console.log('active: ', s.active);
      let order: Order = s.direction === 'desc' ? Order.DESC : Order.ASC;
      let active: string = s.active;

      if (!s.direction) {
        active = "";
      }

      this._studentsFilterQuery.setSortBy({
        sortByOrder: order,
        sortBy: (a, b, state) => {

          switch (active) {
            case "firstName": return this.compare(a.firstName, b.firstName, order == Order.ASC);
            case "lastName": return this.compare(a.lastName, b.lastName, order == Order.ASC);
            case "middleName": return this.compare(a.middleName ?? "", b.middleName ?? "", order == Order.ASC);

            default: return this.compare(a.id, b.id, true);
          }
        }
      })
    });
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private compare(a: string | number , b: string | number , isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
