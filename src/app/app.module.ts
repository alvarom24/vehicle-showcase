import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routes';
import { SharedModule } from "./shared";
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarComparisonComponent } from './car-comparison/car-comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarDetailComponent,
    CarComparisonComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    HttpClientModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
