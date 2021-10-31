import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelOneComponent } from './travel-one/travel-one.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelListComponent,
    TravelOneComponent,
    ErrorPageComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:"",
        component:TravelListComponent
      },
      {
        path:"travels",
        component:TravelListComponent
      },
      {
        path:"travels/:travelId",
        component:TravelOneComponent
      },
      {
        path:"**",
        component:ErrorPageComponent
      }
    ])
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
