import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterCitiesSharedModule } from 'app/shared/shared.module';
import { JhipsterCitiesCoreModule } from 'app/core/core.module';
import { JhipsterCitiesAppRoutingModule } from './app-routing.module';
import { JhipsterCitiesHomeModule } from './home/home.module';
import { JhipsterCitiesEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterCitiesSharedModule,
    JhipsterCitiesCoreModule,
    JhipsterCitiesHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterCitiesEntityModule,
    JhipsterCitiesAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JhipsterCitiesAppModule {}
