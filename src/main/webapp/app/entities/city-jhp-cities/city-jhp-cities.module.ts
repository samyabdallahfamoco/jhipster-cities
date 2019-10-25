import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCitiesSharedModule } from 'app/shared/shared.module';
import { CityJhpCitiesDetailComponent } from './city-jhp-cities-detail.component';
import { CityJhpCitiesUpdateComponent } from './city-jhp-cities-update.component';
import { CityJhpCitiesDeletePopupComponent, CityJhpCitiesDeleteDialogComponent } from './city-jhp-cities-delete-dialog.component';
import { cityRoute, cityPopupRoute } from './city-jhp-cities.route';
import { CityJhpCitiesImplComponent } from './impl/city-jhp-cities-impl/city-jhp-cities-impl.component';

const ENTITY_STATES = [...cityRoute, ...cityPopupRoute];

@NgModule({
  imports: [JhipsterCitiesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    // CityJhpCitiesComponent,
    CityJhpCitiesImplComponent,
    CityJhpCitiesDetailComponent,
    CityJhpCitiesUpdateComponent,
    CityJhpCitiesDeleteDialogComponent,
    CityJhpCitiesDeletePopupComponent
  ],
  entryComponents: [CityJhpCitiesDeleteDialogComponent]
})
export class JhipsterCitiesCityJhpCitiesModule {}
