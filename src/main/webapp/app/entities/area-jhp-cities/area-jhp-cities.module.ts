import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCitiesSharedModule } from 'app/shared/shared.module';
import { AreaJhpCitiesComponent } from './area-jhp-cities.component';
import { AreaJhpCitiesDetailComponent } from './area-jhp-cities-detail.component';
import { AreaJhpCitiesUpdateComponent } from './area-jhp-cities-update.component';
import { AreaJhpCitiesDeletePopupComponent, AreaJhpCitiesDeleteDialogComponent } from './area-jhp-cities-delete-dialog.component';
import { areaRoute, areaPopupRoute } from './area-jhp-cities.route';

const ENTITY_STATES = [...areaRoute, ...areaPopupRoute];

@NgModule({
  imports: [JhipsterCitiesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AreaJhpCitiesComponent,
    AreaJhpCitiesDetailComponent,
    AreaJhpCitiesUpdateComponent,
    AreaJhpCitiesDeleteDialogComponent,
    AreaJhpCitiesDeletePopupComponent
  ],
  entryComponents: [AreaJhpCitiesDeleteDialogComponent]
})
export class JhipsterCitiesAreaJhpCitiesModule {}
