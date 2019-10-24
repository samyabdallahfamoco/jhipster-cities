import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material';

/**
 * Every material component that you want to use can be import here.
 * In that way, every import of material is in this file.
 */
@NgModule({
  imports: [MatButtonModule],
  exports: [MatButtonModule]
})
export class CustomMaterialModule {}
