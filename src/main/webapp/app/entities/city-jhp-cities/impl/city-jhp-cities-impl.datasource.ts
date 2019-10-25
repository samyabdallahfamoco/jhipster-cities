import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, delay } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { CityJhpCitiesImplService } from './city-jhp-cities-impl.service';
import { Request } from 'app/shared/util/request-util';
import { ResponseWrapper } from 'app/shared/util/reponse-wrapper';
import { CityJhpCitiesFilter } from './city-jhp-cities-filter';

/**
 * CityJhpDataSource can be used by a matTable
 */
export class CityJhpDataSource implements DataSource<ICityJhpCities> {
  /**
   * Internal subject of cities
   */
  private citiesSubject = new BehaviorSubject<ICityJhpCities[]>([]);

  /**
   * Used by loadingSubject.next(true)
   */
  private loadingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Can be used elsewhere to know when data are loading
   */
  public loading$ = this.loadingSubject.asObservable();

  /**
   * Total number of elements of the source
   */
  public totalElements: number;

  /**
   * @param citiesService to get data from the API
   */
  constructor(private citiesService: CityJhpCitiesImplService) {}

  /**
   * Get or refresh data depending on params on the method which will be emit by citiesSubject
   * @param filter possible filter to use
   * @param sortField column to filter on
   * @param sortDirection  direction to filter on
   * @param pageIndex page number (use 0 by default)
   * @param pageSize the page size to get
   */
  loadCities(filter: CityJhpCitiesFilter, sortField: string, sortDirection: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    const q: Request = { page: pageIndex, size: pageSize };
    if (sortField) {
      q.sort = this.sort(sortField, sortDirection);
    }

    /**
     * If you want to add new filter you can add them here
     */
    if (filter.nbPeopleMin) {
      q.nbPeopleMin = filter.nbPeopleMin;
    }

    this.citiesService
      .queryImpl(q)
      .pipe(
        delay(800), // An ergo delay time that could be in constant
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((responseWrapper: ResponseWrapper) => {
        this.totalElements = Number(responseWrapper.headers.get('x-total-count'));
        this.citiesSubject.next(responseWrapper.json);
      });
  }

  /**
   * Helper to create a request a sort if required
   * @param sortField the field to sort on
   * @param sortDirection 'desc' or 'asc'
   */
  sort(sortField?: string, sortDirection?: string) {
    const result = [sortField + ',' + sortDirection];
    return result;
  }

  /**
   * return an observable of citiesSubject
   * @param collectionViewer not used here, see DataSource documentation
   */
  connect(collectionViewer: CollectionViewer): Observable<ICityJhpCities[]> {
    return this.citiesSubject.asObservable();
  }

  /**
   * Complete subjects in order to avoid memory leak
   * @param collectionViewer not used here, see DataSource documentation
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.citiesSubject.complete();
    this.loadingSubject.complete();
  }
}
