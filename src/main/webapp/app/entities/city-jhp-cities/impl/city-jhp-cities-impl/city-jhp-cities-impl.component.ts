import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CityJhpDataSource } from '../city-jhp-cities-impl.datasource';
import { Subject } from 'rxjs';
import { MatSort, MatPaginator, MatDatepicker } from '@angular/material';
import { CityJhpCitiesImplService } from '../city-jhp-cities-impl.service';
import { tap, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { merge } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { CityJhpCitiesFilter } from '../city-jhp-cities-filter';
import * as moment from 'moment';

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
   * Used by filters
   */
  public filter: CityJhpCitiesFilter = {};

  /**
   * Destroy all subscription when OnDestroy() is called
   */
  private destroy$ = new Subject();

  @ViewChild(MatSort, { static: true }) private _sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) private _paginator: MatPaginator;

  /**
   * The picker to display date with
   */
  @ViewChild(MatDatepicker, { static: true }) private picker: MatDatepicker<moment.Moment>;

  /**
   * Used by the template in the date filter to set the max date
   */
  public maxDate = new Date();

  /**
   * Each input inside the form view are describe into this FormGroup
   */
  public filterForm = this.fb.group({
    filterNbPeopleMin: 0,
    filterByDate: { value: '', disabled: true }
  });

  /**
   * @param cityService allows to fetch data
   * @param fb: FormBuilder that alows to use form
   */
  constructor(private cityService: CityJhpCitiesImplService, private fb: FormBuilder) {}

  /**
   * Load cities and init subscription to each filter form
   */
  ngOnInit() {
    this.citiesDataSource = new CityJhpDataSource(this.cityService);
    this.citiesDataSource.loadCities(this.filter, 'id', 'desc', 0, 10);
    this.subscribeToReactiveForm();
  }

  /**
   * For each input from the form, checking if the value change and making request to the API
   * In order to refresh the table
   */
  private subscribeToReactiveForm(): void {
    this._filterFormField('filterNbPeopleMin', 'nbPeopleMin', (val: number) => val);
    this._filterDateRange();
  }

  /**
   * This method avoid duplication of code
   * it will suscribe to change of a related formControlName and make request to the API depending on the filter
   * The filter on null value is required when the user fill a field and then click on the reset button
   *
   * @param paramToFilter string, the name of the form group
   * @param filterObjectField string, the key of the filter to set
   * @param fcChangeValue method, the method that return the right value, example (val: string) => val) or (val: string) => value.format('YYYY-MM-DD')
   */
  private _filterFormField(formControlName: string, filterObjectField: string, fcChangeValue: (val: any) => any) {
    this.filterForm
      .get(formControlName)
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this._paginator.pageIndex = 0;
        this.filter[filterObjectField] = fcChangeValue(value);
        this.loadCitiesPage();
      });
  }

  /**
   * This filter method is used for filterByDate filter field.
   */
  private _filterDateRange() {
    this.filterForm
      .get('filterByDate')
      .valueChanges.pipe(
        debounceTime(150),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        filter(value => value !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this._paginator.pageIndex = 0;
        this.filter['fromDate'] = moment(value)
          .startOf('day')
          .format('YYYY-MM-DD');
        this.filter['toDate'] = moment(value)
          .endOf('day')
          .format('YYYY-MM-DD');
        this.loadCitiesPage();
      });
  }

  /**
   * Allows to refresh cities list
   */
  private loadCitiesPage() {
    this.citiesDataSource.loadCities(
      this.filter,
      this._sort.active,
      this._sort.direction,
      this._paginator.pageIndex,
      this._paginator.pageSize
    );
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
