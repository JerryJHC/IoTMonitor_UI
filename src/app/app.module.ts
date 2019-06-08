import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartTemplateComponent } from './components/charttemplate/charttemplate.component';
import { CurrentMeasureComponent } from './components/current-measure/current-measure.component';
import { IntervalMeasureComponent } from './components/interval-measure/interval-measure.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartTemplateComponent,
    CurrentMeasureComponent,
    IntervalMeasureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
