import { Component, OnInit,Input } from '@angular/core';
import {AngularFire, AuthProviders} from "angularfire2";
import {HotelsService} from "../../hotel/shared/hotels.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {AddCustomHotelComponent} from "../../hotel/components/add-custom-hotel/add-custom-hotel.component";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
   auth;
  constructor(private af: AngularFire, public dialog: MdDialog) {

  }

  ngOnInit() {
    this.auth =  this.auth || this.af.auth;
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    }).then(user => {

    });
  }

  addHotel(){
    let config = new MdDialogConfig();
    let ref = this.dialog.open(AddCustomHotelComponent, config);
    return ref;
  }

  logout() {
    this.af.auth.logout();
  }

}
