import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<ICityJhpCities>(this.resourceUrl, city, { observe: 'response' });
  }

  update(city: ICityJhpCities): Observable<EntityResponseType> {
    return this.http.put<ICityJhpCities>(this.resourceUrl, city, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICityJhpCities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICityJhpCities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
