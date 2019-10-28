import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';

type EntityResponseType = HttpResponse<ICityJhpCities>;
type EntityArrayResponseType = HttpResponse<ICityJhpCities[]>;

@Injectable({ providedIn: 'root' })
export class CityJhpCitiesService {
  public resourceUrl = SERVER_API_URL + 'api/cities';

  constructor(protected http: HttpClient) {}

  create(city: ICityJhpCities): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(city);
    return this.http
      .post<ICityJhpCities>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(city: ICityJhpCities): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(city);
    return this.http
      .put<ICityJhpCities>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICityJhpCities>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICityJhpCities[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(city: ICityJhpCities): ICityJhpCities {
    const copy: ICityJhpCities = Object.assign({}, city, {
      dateUpdate: city.dateUpdate != null && city.dateUpdate.isValid() ? city.dateUpdate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateUpdate = res.body.dateUpdate != null ? moment(res.body.dateUpdate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((city: ICityJhpCities) => {
        city.dateUpdate = city.dateUpdate != null ? moment(city.dateUpdate) : null;
      });
    }
    return res;
  }
}
