import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelect2Module } from 'ngSelect2';

import { AppComponent } from './app.component';
import { BasicComponent } from './demos/basic/basic.component';
import { OptionsComponent } from './demos/options/options.component';
import { ChangeComponent } from './demos/change/change.component';
import { DynamicComponent } from './demos/dynamic/dynamic.component';
import { MultipleComponent } from './demos/multiple/multiple.component';
import { TemplateComponent } from './demos/template/template.component';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { CustomArrayComponent } from './demos/custom-array/custom-array.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    OptionsComponent,
    ChangeComponent,
    DynamicComponent,
    TemplateComponent,
    MultipleComponent,
    CustomArrayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelect2Module
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
