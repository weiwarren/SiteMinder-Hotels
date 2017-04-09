import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelMapViewComponent } from './components/hotel-map-view/hotel-map-view.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from 'angular2-google-maps/core'

import {HotelListComponent} from "./components/hotel-list/hotel-list.component";
import {MaterialModule} from "@angular/material";
import {HotelDetailComponent} from "./components/hotel-detail/hotel-detail.component";
import {MapContentComponent} from "./components/hotel-map-view/map-content-view.component";
import {HotelComponent} from "./hotel.component";
import {AngularFireModule, AuthMethods, AuthProviders} from "angularfire2";
import {HotelsService} from "./shared/hotels.service";
import { HotelCellComponent } from './components/hotel-cell/hotel-cell.component';
import { GoogleAddressSearchComponent } from './components/google-address-search/google-address-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SpinnerComponent } from './components/spinner/spinner.component';
import {DistanceLiteralPipe} from "../shared/pipes/distance-literal.pipe";
import { AddCustomHotelComponent } from './components/add-custom-hotel/add-custom-hotel.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXi4VTIYZ2YTaRTUPVBkmnS_OGByfyw2g',
      libraries: ["places"]
    }),
  ],
  declarations: [
    HotelComponent,
    HotelListComponent,
    HotelDetailComponent,
    HotelMapViewComponent,
    MapContentComponent,
    HotelCellComponent,
    GoogleAddressSearchComponent,
    SpinnerComponent,
    DistanceLiteralPipe,
    AddCustomHotelComponent

  ],
  providers:[GoogleMapsAPIWrapper, HotelsService],
  exports:[HotelComponent],
  entryComponents: [HotelDetailComponent, GoogleAddressSearchComponent,SpinnerComponent, AddCustomHotelComponent]
})
export class HotelModule { }
