import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';
import { ManagerJhpCitiesService } from './manager-jhp-cities.service';
import { ManagerJhpCitiesComponent } from './manager-jhp-cities.component';
import { ManagerJhpCitiesDetailComponent } from './manager-jhp-cities-detail.component';
import { ManagerJhpCitiesUpdateComponent } from './manager-jhp-cities-update.component';
import { ManagerJhpCitiesDeletePopupComponent } from './manager-jhp-cities-delete-dialog.component';
import { IManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';

@Injectable({ providedIn: 'root' })
export class ManagerJhpCitiesResolve implements Resolve<IManagerJhpCities> {
  constructor(private service: ManagerJhpCitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IManagerJhpCities> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ManagerJhpCities>) => response.ok),
        map((manager: HttpResponse<ManagerJhpCities>) => manager.body)
      );
    }
    return of(new ManagerJhpCities());
  }
}

export const managerRoute: Routes = [
  {
    path: '',
    component: ManagerJhpCitiesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Managers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ManagerJhpCitiesDetailComponent,
    resolve: {
      manager: ManagerJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Managers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ManagerJhpCitiesUpdateComponent,
    resolve: {
      manager: ManagerJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Managers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ManagerJhpCitiesUpdateComponent,
    resolve: {
      manager: ManagerJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Managers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const managerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ManagerJhpCitiesDeletePopupComponent,
    resolve: {
      manager: ManagerJhpCitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Managers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
