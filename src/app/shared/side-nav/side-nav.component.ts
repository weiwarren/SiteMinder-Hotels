import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders} from "angularfire2";
import {AddCustomHotelComponent} from "../../hotel/components/add-custom-hotel/add-custom-hotel.component";
import {MdDialogConfig, MdDialog} from "@angular/material";

@Component({
  selector: 'site-minder-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private af: AngularFire, private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  addHotel() {
    this.af.auth.subscribe(auth => {
      if (auth && auth.uid) {
        this.openAddHotelModal();

      }
      else {
        this.af.auth.login({
          provider: AuthProviders.Google
        }).then(user => {
          this.openAddHotelModal();
        });
      }
    })
  }

  openAddHotelModal() {
    let config = new MdDialogConfig();
    let ref = this.dialog.open(AddCustomHotelComponent, config);
    return ref;
  }

}
