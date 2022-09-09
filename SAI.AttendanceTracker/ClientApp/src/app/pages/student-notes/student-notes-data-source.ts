import { MatSort } from "@angular/material/sort";
import { ID, Order } from "@datorama/akita";
import { searchFilter } from 'akita-filters-plugin';
import { TableDataSource } from "../../datasources/table.datasource";
import { StudentNote, StudentsNotesQuery, StudentsNotesState } from "../../states/students-notes";

export class StudentNotesDataSource extends TableDataSource<StudentNote, StudentsNotesState> {

  constructor(
    studentId: ID,
    query: StudentsNotesQuery,
    columns: string[] = []) {
    super(query, columns);

    this.setSort(Order.DESC);
    this._dataQuery$.setFilter({
      id: "studentId",
      value: studentId,
      predicate: (entity, index, array) => entity.studentId == studentId
    });
  }

  setSortListener(sort: MatSort) {

    sort.sortChange.subscribe(s => {

      let order: Order = !s.direction || s.direction === 'desc' ? Order.DESC : Order.ASC;
      this.setSort(order);
    });
  }

  private setSort(order: Order): void {

    this._dataQuery$.setSortBy({
      sortByOrder: order,
      sortBy: (a, b, state) => (a.date < b.date ? -1 : 1) * (order == Order.ASC ? 1 : -1)
    });
  }
}
