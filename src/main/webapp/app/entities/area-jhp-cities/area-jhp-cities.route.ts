import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AreaJhpCities } from 'app/shared/model/area-jhp-cities.model';
import { AreaJhpCitiesService } from './area-jhp-cities.service';
import { AreaJhpCitiesComponent } from './area-jhp-cities.component';
import { AreaJhpCitiesDetailComponent } from './area-jhp-cities-detail.component';
import { AreaJhpCitiesUpdateComponent } from './area-jhp-cities-update.component';
import { AreaJhpCitiesDeletePopupComponent } from './area-jhp-cities-delete-dialog.component';
import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';

@Injectable({ providedIn: 'root' })
export class AreaJhpCitiesResolve implements Resolve<IAreaJhpCities> {
  constructor(private service: AreaJhpCitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAreaJhpCities> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AreaJhpCities>) => response.ok),
        map((area: HttpResponse<AreaJhpCities>) => area.body)
      );
    }
    return of(new AreaJhpCities());
  }
}

export const areaRoute: Routes = [
  {
    path: '',
    component: AreaJhpCitiesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Areas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AreaJhpCitiesDetailComponent,
    resolve: {
      area: AreaJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Areas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AreaJhpCitiesUpdateComponent,
    resolve: {
      area: AreaJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Areas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AreaJhpCitiesUpdateComponent,
    resolve: {
      area: AreaJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Areas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const areaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AreaJhpCitiesDeletePopupComponent,
    resolve: {
      area: AreaJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Areas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
