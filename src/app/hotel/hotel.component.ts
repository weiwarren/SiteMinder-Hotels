import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {FirebaseRef} from "angularfire2";
import {MdSnackBarConfig, MdDialogConfig, MdSnackBar} from "@angular/material";
var Push = require('push.js');

import {Hotel} from "./shared/hotel.model";
import {HotelDetailComponent} from "./components/hotel-detail/hotel-detail.component";
import {HotelsService} from "./shared/hotels.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(@Inject(FirebaseRef) fb, private hotelService: HotelsService) {

    fb.database().ref("/hotels").on("child_added", snap => {
      console.debug(snap.val());
      if(snap.val().createdBy){
        this.openSnackBar("a new hotel just appeared in your area!", "click",  5000, snap.val())
      }
    });

    fb.database().ref(".info/connected").on("value", snap => {
      if (!snap.val()) {
        this.openSnackBar("connecting", "")
      }
      else{
        this.openSnackBar("connected", "", 2000)

      }
    });


    const messaging = fb.database().app.messaging();
    messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return messaging.getToken();
      })
      .then(token => {
        console.log(token)
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });

    messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
      Push.create('new message', {
        timeout: 1000
      });
    });

    this.hotelService.centre.skip(1).distinctUntilChanged().subscribe(loc => {
      if(loc){
        localStorage.setItem("centre", JSON.stringify(loc));
      }
    });

  }

  ngOnInit() {
    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if (JSON.parse(localStorage.getItem("centre"))) {
      this.hotelService.setCentre(JSON.parse(localStorage.getItem("centre")))
    }
    else {
      this.hotelService.setCentre(this.hotelService.DEFAULT_LOCATION);
      this.hotelService.requestLocation().subscribe(location => {
        if(location){
          this.hotelService.setCentre(location);
        }
      });
    }
  }

  openSnackBar(message: string, action: string, duration: number=5000, args?: any) {
    let ref = this.hotelService.openSnackBar(message, action, duration, args)
    ref.onAction().subscribe(id => {
      this.openHotelDetail(args)
    })
  }


  openHotelDetail(hotel: Hotel) {
    let ref = this.hotelService.openHotelDetail(hotel);
  }
}
