import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CountryJhpCities } from 'app/shared/model/country-jhp-cities.model';
import { CountryJhpCitiesService } from './country-jhp-cities.service';
import { CountryJhpCitiesComponent } from './country-jhp-cities.component';
import { CountryJhpCitiesDetailComponent } from './country-jhp-cities-detail.component';
import { CountryJhpCitiesUpdateComponent } from './country-jhp-cities-update.component';
import { CountryJhpCitiesDeletePopupComponent } from './country-jhp-cities-delete-dialog.component';
import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

@Injectable({ providedIn: 'root' })
export class CountryJhpCitiesResolve implements Resolve<ICountryJhpCities> {
  constructor(private service: CountryJhpCitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICountryJhpCities> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CountryJhpCities>) => response.ok),
        map((country: HttpResponse<CountryJhpCities>) => country.body)
      );
    }
    return of(new CountryJhpCities());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryJhpCitiesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Countries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CountryJhpCitiesDetailComponent,
    resolve: {
      country: CountryJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Countries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CountryJhpCitiesUpdateComponent,
    resolve: {
      country: CountryJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Countries'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CountryJhpCitiesUpdateComponent,
    resolve: {
      country: CountryJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Countries'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const countryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CountryJhpCitiesDeletePopupComponent,
    resolve: {
      country: CountryJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Countries'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
