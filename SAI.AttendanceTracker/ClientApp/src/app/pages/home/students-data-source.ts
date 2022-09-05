import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { combineQueries, HashMap, Order } from '@datorama/akita';
import { MatSort } from '@angular/material/sort';
import { AkitaFiltersPlugin, searchFilter, searchFilterIn } from 'akita-filters-plugin';
import { Student, StudentsState, StudentsQuery } from '../../states/students';

export class StudentsDataSource extends DataSource<Student> {

  public data?: Student[];
  private _dataStream = new ReplaySubject<Student[]>();

  private _studentsFilterQuery: AkitaFiltersPlugin<StudentsState>;

  constructor(
    studentsQuery: StudentsQuery) {

    super();

    this._studentsFilterQuery = new AkitaFiltersPlugin<StudentsState>(studentsQuery);
    this._studentsFilterQuery.selectAllByFilters().subscribe(students => this.setData(students as Student[]))
  }

  connect(): Observable<Student[]> {

    return this._dataStream;
  }

  disconnect() { }

  setData(data: Student[]) {

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
