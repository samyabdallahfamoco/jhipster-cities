import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCitiesSharedModule } from 'app/shared/shared.module';
import { CityJhpCitiesComponent } from './city-jhp-cities.component';
import { CityJhpCitiesDetailComponent } from './city-jhp-cities-detail.component';
import { CityJhpCitiesUpdateComponent } from './city-jhp-cities-update.component';
import { CityJhpCitiesDeletePopupComponent, CityJhpCitiesDeleteDialogComponent } from './city-jhp-cities-delete-dialog.component';
import { cityRoute, cityPopupRoute } from './city-jhp-cities.route';

const ENTITY_STATES = [...cityRoute, ...cityPopupRoute];

@NgModule({
  imports: [JhipsterCitiesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CityJhpCitiesComponent,
    CityJhpCitiesDetailComponent,
    CityJhpCitiesUpdateComponent,
    CityJhpCitiesDeleteDialogComponent,
    CityJhpCitiesDeletePopupComponent
  ],
  entryComponents: [CityJhpCitiesDeleteDialogComponent]
})
export class JhipsterCitiesCityJhpCitiesModule {}
