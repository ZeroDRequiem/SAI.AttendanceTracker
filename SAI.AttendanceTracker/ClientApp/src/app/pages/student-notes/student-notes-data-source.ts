import { DataSource } from "@angular/cdk/collections";
import { MatSort } from "@angular/material/sort";
import { ID, Order } from "@datorama/akita";
import { AkitaFiltersPlugin } from "akita-filters-plugin";
import { Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { StudentNote, StudentsNotesQuery, StudentsNotesState } from "../../states/students-notes";

export class StudentNotesDataSource extends DataSource<StudentNote> {

  private _dataStream = new ReplaySubject<StudentNote[]>();
  private studentsNotesFilterQuery: AkitaFiltersPlugin<StudentsNotesState>;

  constructor(studentId: ID, studentsNotesQuery: StudentsNotesQuery) {
    super();

    this.studentsNotesFilterQuery = new AkitaFiltersPlugin<StudentsNotesState>(studentsNotesQuery);

    this.setSort(Order.DESC);
    this.studentsNotesFilterQuery.setFilter({
      id: "studentId",
      value: studentId,
      predicate: (entity, index, array) => entity.studentId == studentId
    });

    this.studentsNotesFilterQuery.selectAllByFilters()
      .pipe(map(studentNotes => studentNotes as StudentNote[]))
      .subscribe(studentNotes => this.setData(studentNotes));
  }

  connect(): Observable<StudentNote[]> {

    return this._dataStream;
  }

  disconnect() { }

  setData(data: StudentNote[]) {

    this._dataStream.next(data);
  }

  setSortListener(sort: MatSort) {

    sort.sortChange.subscribe(s => {

      let order: Order = !s.direction || s.direction === 'desc' ? Order.DESC : Order.ASC;
      this.setSort(order);
    });
  }

  private setSort(order: Order): void {

    this.studentsNotesFilterQuery.setSortBy({
      sortByOrder: order,
      sortBy: (a, b, state) => (a.date < b.date ? -1 : 1) * (order == Order.ASC ? 1 : -1)
    });
  }
}
