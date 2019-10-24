import { NgModule } from '@angular/core';
import { JhipsterCitiesSharedLibsModule } from './shared-libs.module';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { CustomMaterialModule } from './custom-material.module';

@NgModule({
  imports: [JhipsterCitiesSharedLibsModule, CustomMaterialModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent, HasAnyAuthorityDirective],
  exports: [JhipsterCitiesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, HasAnyAuthorityDirective, CustomMaterialModule]
})
export class JhipsterCitiesSharedModule {}
