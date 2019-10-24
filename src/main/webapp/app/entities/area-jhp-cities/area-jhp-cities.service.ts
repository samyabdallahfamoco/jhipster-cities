import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';

type EntityResponseType = HttpResponse<IAreaJhpCities>;
type EntityArrayResponseType = HttpResponse<IAreaJhpCities[]>;

@Injectable({ providedIn: 'root' })
export class AreaJhpCitiesService {
  public resourceUrl = SERVER_API_URL + 'api/areas';

  constructor(protected http: HttpClient) {}

  create(area: IAreaJhpCities): Observable<EntityResponseType> {
    return this.http.post<IAreaJhpCities>(this.resourceUrl, area, { observe: 'response' });
  }

  update(area: IAreaJhpCities): Observable<EntityResponseType> {
    return this.http.put<IAreaJhpCities>(this.resourceUrl, area, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAreaJhpCities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAreaJhpCities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
