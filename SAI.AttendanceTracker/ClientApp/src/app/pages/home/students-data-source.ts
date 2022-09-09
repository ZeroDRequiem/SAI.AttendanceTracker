import { Order } from '@datorama/akita';
import { MatSort } from '@angular/material/sort';
import { searchFilter } from 'akita-filters-plugin';
import { Student, StudentsState, StudentsQuery } from '../../states/students';
import { TableDataSource } from '../../datasources/table.datasource';

export class StudentsDataSource extends TableDataSource<Student, StudentsState> {

  constructor(
    query: StudentsQuery,
    columns: string[] = []) {
    super(query, columns);
  }

  setSortListener(sort: MatSort) {

    sort.sortChange.subscribe(s => {

      let order: Order = s.direction === 'desc' ? Order.DESC : Order.ASC;
      let active: string = s.active;

      if (!s.direction) {
        active = "";
      }

      this._dataQuery$.setSortBy({
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
