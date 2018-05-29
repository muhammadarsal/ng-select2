import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgSelect2Component } from './ng-select2/ng-select2.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NgSelect2Component,
  ],
  declarations: [
    NgSelect2Component,
  ],
})
export class NgSelect2Module { }
