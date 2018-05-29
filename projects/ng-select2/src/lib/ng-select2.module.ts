import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgSelect2Component } from './ng-select2.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgSelect2Component],
  exports: [NgSelect2Component]
})
export class NgSelect2Module { }
