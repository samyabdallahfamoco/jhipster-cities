import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { CityJhpCitiesService } from './city-jhp-cities.service';
import { CityJhpCitiesComponent } from './city-jhp-cities.component';
import { CityJhpCitiesDetailComponent } from './city-jhp-cities-detail.component';
import { CityJhpCitiesUpdateComponent } from './city-jhp-cities-update.component';
import { CityJhpCitiesDeletePopupComponent } from './city-jhp-cities-delete-dialog.component';
import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { CityJhpCitiesImplComponent } from './impl/city-jhp-cities-impl/city-jhp-cities-impl.component';

@Injectable({ providedIn: 'root' })
export class CityJhpCitiesResolve implements Resolve<ICityJhpCities> {
  constructor(private service: CityJhpCitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICityJhpCities> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CityJhpCities>) => response.ok),
        map((city: HttpResponse<CityJhpCities>) => city.body)
      );
    }
    return of(new CityJhpCities());
  }
}

export const cityRoute: Routes = [
  {
    path: '',
    component: CityJhpCitiesImplComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CityJhpCitiesDetailComponent,
    resolve: {
      city: CityJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CityJhpCitiesUpdateComponent,
    resolve: {
      city: CityJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CityJhpCitiesUpdateComponent,
    resolve: {
      city: CityJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CityJhpCitiesDeletePopupComponent,
    resolve: {
      city: CityJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
