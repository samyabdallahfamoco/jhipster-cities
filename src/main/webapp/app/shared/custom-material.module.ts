import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';

/**
 * Every material component that you want to use can be import here.
 * In that way, every import of material is in this file.
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule
  ]
})
export class CustomMaterialModule {}
