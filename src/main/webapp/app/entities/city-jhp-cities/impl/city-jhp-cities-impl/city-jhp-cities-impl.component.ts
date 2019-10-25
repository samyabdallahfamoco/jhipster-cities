import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CityJhpDataSource } from './city-jhp-cities-impl.datasource';
import { Subject } from 'rxjs';
import { MatSort, MatPaginator } from '@angular/material';
import { CityJhpCitiesImplService } from './city-jhp-cities-impl.service';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'jhi-city-jhp-cities-impl',
  templateUrl: './city-jhp-cities-impl.component.html',
  styleUrls: ['./city-jhp-cities-impl.component.scss']
})
export class CityJhpCitiesImplComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * List of column used by the template to display each header
   */
  public displayedColumns = ['id', 'name', 'nbPeople', 'postalCode'];

  /**
   * The custom matTable dataSource
   */
  public citiesDataSource: CityJhpDataSource;

  /**
   * Destroy all subscription when OnDestroy() is called
   */
  private destroy$ = new Subject();

  @ViewChild(MatSort, { static: true }) private _sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) private _paginator: MatPaginator;

  /**
   * @param cityService allows to fetch data
   */
  constructor(private cityService: CityJhpCitiesImplService) {}

  /**
   * Load cities and init subscription to each filter form
   */
  ngOnInit() {
    this.citiesDataSource = new CityJhpDataSource(this.cityService);
    this.citiesDataSource.loadCities('id', 'desc', 0, 10);
  }

  /**
   * Allows to refresh cities list
   */
  private loadCitiesPage() {
    this.citiesDataSource.loadCities(this._sort.active, this._sort.direction, this._paginator.pageIndex, this._paginator.pageSize);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this._sort.sortChange.subscribe(() => (this._paginator.pageIndex = 0));
    merge(this._sort.sortChange, this._paginator.page)
      .pipe(tap(() => this.loadCitiesPage()))
      .subscribe();
  }

  /**
   * Call destroy$ to remove subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
