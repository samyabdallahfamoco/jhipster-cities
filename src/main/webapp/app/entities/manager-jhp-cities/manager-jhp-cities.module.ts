import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCitiesSharedModule } from 'app/shared/shared.module';
import { ManagerJhpCitiesComponent } from './manager-jhp-cities.component';
import { ManagerJhpCitiesDetailComponent } from './manager-jhp-cities-detail.component';
import { ManagerJhpCitiesUpdateComponent } from './manager-jhp-cities-update.component';
import { ManagerJhpCitiesDeletePopupComponent, ManagerJhpCitiesDeleteDialogComponent } from './manager-jhp-cities-delete-dialog.component';
import { managerRoute, managerPopupRoute } from './manager-jhp-cities.route';

const ENTITY_STATES = [...managerRoute, ...managerPopupRoute];

@NgModule({
  imports: [JhipsterCitiesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ManagerJhpCitiesComponent,
    ManagerJhpCitiesDetailComponent,
    ManagerJhpCitiesUpdateComponent,
    ManagerJhpCitiesDeleteDialogComponent,
    ManagerJhpCitiesDeletePopupComponent
  ],
  entryComponents: [ManagerJhpCitiesDeleteDialogComponent]
})
export class JhipsterCitiesManagerJhpCitiesModule {}
