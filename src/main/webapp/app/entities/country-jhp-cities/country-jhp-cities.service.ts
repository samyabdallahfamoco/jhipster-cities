import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

type EntityResponseType = HttpResponse<ICountryJhpCities>;
type EntityArrayResponseType = HttpResponse<ICountryJhpCities[]>;

@Injectable({ providedIn: 'root' })
export class CountryJhpCitiesService {
  public resourceUrl = SERVER_API_URL + 'api/countries';

  constructor(protected http: HttpClient) {}

  create(country: ICountryJhpCities): Observable<EntityResponseType> {
    return this.http.post<ICountryJhpCities>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountryJhpCities): Observable<EntityResponseType> {
    return this.http.put<ICountryJhpCities>(this.resourceUrl, country, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountryJhpCities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryJhpCities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
