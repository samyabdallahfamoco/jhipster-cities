import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'city-jhp-cities',
        loadChildren: () => import('./city-jhp-cities/city-jhp-cities.module').then(m => m.JhipsterCitiesCityJhpCitiesModule)
      },
      {
        path: 'area-jhp-cities',
        loadChildren: () => import('./area-jhp-cities/area-jhp-cities.module').then(m => m.JhipsterCitiesAreaJhpCitiesModule)
      },
      {
        path: 'country-jhp-cities',
        loadChildren: () => import('./country-jhp-cities/country-jhp-cities.module').then(m => m.JhipsterCitiesCountryJhpCitiesModule)
      },
      {
        path: 'manager-jhp-cities',
        loadChildren: () => import('./manager-jhp-cities/manager-jhp-cities.module').then(m => m.JhipsterCitiesManagerJhpCitiesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterCitiesEntityModule {}
