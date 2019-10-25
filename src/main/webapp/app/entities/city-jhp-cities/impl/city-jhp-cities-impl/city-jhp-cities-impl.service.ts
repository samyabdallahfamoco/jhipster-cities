import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityJhpCitiesService } from '../../city-jhp-cities.service';
import { ResponseWrapper } from 'app/shared/util/reponse-wrapper';
import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { map } from 'rxjs/operators';

/**
 * Allows to get data related to Cities endpoints
 */
@Injectable({
  providedIn: 'root'
})
export class CityJhpCitiesImplService extends CityJhpCitiesService {
  /**
   * @param http in order to make http requests
   */
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Get a list of ITransaction
   * This method is used by dataSource
   * @param req the param created by the API
   */
  queryImpl(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return this.http
      .get<ICityJhpCities[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: any) => this.convertResponse(res)));
  }

  /**
   * Method used to handle the endpoint response
   * @param res the api response
   */
  private convertResponse(res: any): ResponseWrapper {
    const jsonResponse = res.body;
    return new ResponseWrapper(res.headers, jsonResponse, res.status);
  }
}
