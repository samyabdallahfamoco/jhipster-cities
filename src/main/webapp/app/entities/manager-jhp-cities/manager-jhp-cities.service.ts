import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';

type EntityResponseType = HttpResponse<IManagerJhpCities>;
type EntityArrayResponseType = HttpResponse<IManagerJhpCities[]>;

@Injectable({ providedIn: 'root' })
export class ManagerJhpCitiesService {
  public resourceUrl = SERVER_API_URL + 'api/managers';

  constructor(protected http: HttpClient) {}

  create(manager: IManagerJhpCities): Observable<EntityResponseType> {
    return this.http.post<IManagerJhpCities>(this.resourceUrl, manager, { observe: 'response' });
  }

  update(manager: IManagerJhpCities): Observable<EntityResponseType> {
    return this.http.put<IManagerJhpCities>(this.resourceUrl, manager, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IManagerJhpCities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IManagerJhpCities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
