import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelect2Module } from 'ng-select2';

import { AppComponent } from './app.component';
import { AllowClearComponent } from './demos/allow-clear/allow-clear.component';
import { BasicComponent } from './demos/basic/basic.component';
import { ChangeComponent } from './demos/change/change.component';
import { CustomArrayComponent } from './demos/custom-array/custom-array.component';
import { DynamicComponent } from './demos/dynamic/dynamic.component';
import { FormComponent } from './demos/form/form.component';
import { MultipleComponent } from './demos/multiple/multiple.component';
import { OptionsComponent } from './demos/options/options.component';
import { TemplateComponent } from './demos/template/template.component';
import { ValueChangedComponent } from './demos/value-changed/value-changed.component';
import { DataService } from './services/data.service';
import {AutofillComponent} from './demos/autofill/autofill.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    OptionsComponent,
    ChangeComponent,
    DynamicComponent,
    TemplateComponent,
    MultipleComponent,
    CustomArrayComponent,
    ValueChangedComponent,
    AllowClearComponent,
    FormComponent,
    AutofillComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelect2Module,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
