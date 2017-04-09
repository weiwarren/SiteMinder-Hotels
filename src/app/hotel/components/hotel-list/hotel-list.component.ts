import {Component, OnInit, Inject, Input} from '@angular/core';
import {FirebaseListObservable} from "angularfire2";

import {MdSnackBar} from '@angular/material';
import {Hotel} from "../../shared/hotel.model";
import {HotelsService} from "../../shared/hotels.service";
import {GeoLoc} from "../../shared/geo-loc.model";
import {Subject, Observable} from "rxjs";
import {Place} from "../../shared/place.model";

@Component({
  selector: 'hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  hotels: Observable<any[]>;
  selectedHotel: Hotel;
  constructor(public snackBar: MdSnackBar, public hotelService: HotelsService) {
  }

  ngOnInit() {
    this.hotelService.centre.debounceTime(200).subscribe(centre => {
      if (centre) {
        this.hotels = this.hotelService.getHotels();
      }
    });

    this.hotelService.bounds.debounceTime(200).subscribe(bounds => {
      console.log(bounds);
      if(bounds){
        let centre = new GeoLoc(bounds.getCenter().lat(), bounds.getCenter().lng())
        this.hotelService.getCustomHotels(centre, bounds).subscribe(hotel => {
          console.log('nearby', hotel, bounds);
        });
      }
    })
  }

  onLocationSelected(place: Place){
    let centre = new GeoLoc(place.geometry.location.lat(), place.geometry.location.lng());
    this.hotelService.setCentre(centre);
  }

  viewHotelDetails(hotel) {
    this.selectedHotel = hotel;
    this.hotelService.focusHotel(hotel);
  }

  bookmark() {

  }


}
