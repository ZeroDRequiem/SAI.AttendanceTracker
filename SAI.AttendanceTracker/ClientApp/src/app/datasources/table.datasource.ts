import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { EntityState, QueryEntity } from "@datorama/akita";
import { AkitaFiltersPlugin } from "akita-filters-plugin";
import { Observable, ReplaySubject } from "rxjs";
import { searchFilter } from 'akita-filters-plugin';

export abstract class TableDataSource<T, S extends EntityState<T>> extends DataSource<T> {

  private _data?: T[];
  private _dataStream$ = new ReplaySubject<T[]>();
  private _columns: string[];
  private _selection: SelectionModel<T> = new SelectionModel<T>(true, []);

  protected _dataQuery$: AkitaFiltersPlugin<S>;

  constructor(
    query: QueryEntity<S>,
    columns: string[] = []) {
    super();

    this._columns = columns;
    this._dataQuery$ = new AkitaFiltersPlugin<S>(query);
    this._dataQuery$
      .selectAllByFilters()
      .subscribe(data => this.setData(data as T[]));
  }

  public connect(): Observable<T[]> {

    return this._dataStream$;
  }

  public disconnect() { }

  public get data() {

    return this._data;
  }

  public get columns() {

    return this._columns;
  }

  public get selection() {

    return this._selection;
  }

  public isAllSelected() {

    const numSelected = this._selection.selected.length;
    const numRows = this.data?.length ?? 0;
    return numSelected === numRows;
  }

  public toggleAll() {

    if (this.isAllSelected()) {

      this._selection.clear();
      return;
    }

    return this._selection.select(...this.data ?? []);
  }

  public toggleData(item: T) {

    return this._selection.toggle(item);
  }

  public isSelected(item: T) {

    return this._selection.isSelected(item);
  }

  public hasValue() {

    return this._selection.hasValue();
  }

  private setData(data: T[]) {

    this._data = data;
    this._dataStream$.next(data);
  }

  public setFilterText(filterText: string) {

    filterText = filterText.trim().toUpperCase();
    this._dataQuery$.setFilter({
      id: "text",
      value: filterText,
      predicate: (item, index, array) => searchFilter(filterText, item)
    });
  }
}
