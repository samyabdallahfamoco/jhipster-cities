import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCitiesSharedModule } from 'app/shared/shared.module';
import { CountryJhpCitiesComponent } from './country-jhp-cities.component';
import { CountryJhpCitiesDetailComponent } from './country-jhp-cities-detail.component';
import { CountryJhpCitiesUpdateComponent } from './country-jhp-cities-update.component';
import { CountryJhpCitiesDeletePopupComponent, CountryJhpCitiesDeleteDialogComponent } from './country-jhp-cities-delete-dialog.component';
import { countryRoute, countryPopupRoute } from './country-jhp-cities.route';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
  imports: [JhipsterCitiesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CountryJhpCitiesComponent,
    CountryJhpCitiesDetailComponent,
    CountryJhpCitiesUpdateComponent,
    CountryJhpCitiesDeleteDialogComponent,
    CountryJhpCitiesDeletePopupComponent
  ],
  entryComponents: [CountryJhpCitiesDeleteDialogComponent]
})
export class JhipsterCitiesCountryJhpCitiesModule {}
