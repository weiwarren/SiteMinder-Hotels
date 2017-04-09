import {Component, OnInit} from '@angular/core';
import {GeoLoc} from "../../shared/geo-loc.model";
import {HotelsService} from "../../shared/hotels.service";
import {Hotel} from "../../shared/hotel.model";
import {Place} from "../../shared/place.model";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'site-minder-add-custom-hotel',
  templateUrl: './add-custom-hotel.component.html',
  styleUrls: ['./add-custom-hotel.component.css']
})
export class AddCustomHotelComponent implements OnInit {
  name: string;
  place: Place;
  description: string = '';
  vicinity: string = '';
  photos: string = '';

  constructor(private hotelService: HotelsService, private dialogRef: MdDialogRef<AddCustomHotelComponent>) {

  }

  ngOnInit() {
  }

  locationSelected(place: Place) {
    this.place = place;
  }

  saveForm() {
    let hotel = new Hotel();
    hotel.name = this.name;
    hotel.lat = this.place.geometry.location.lat();
    hotel.lng = this.place.geometry.location.lng();
    hotel.description = this.description;
    hotel.vicinity = this.place.formatted_address;
    hotel.custom = true;
    hotel.photos = this.photos;
    this.hotelService.saveHotel(hotel).subscribe((success) => {
      if (success) {
        this.dialogRef.close();
        let ref = this.hotelService.openSnackBar("Your hotel is added successfully", "Click here to view", 5000);
        ref.onAction().subscribe(()=> {
          this.hotelService.openHotelDetail(hotel);
        })
      }
      else{
        this.hotelService.openSnackBar("Error adding hotel", "", 5000)
      }
    });
  }

}
