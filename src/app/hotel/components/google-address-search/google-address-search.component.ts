import {Component, OnInit, NgZone, ElementRef, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {MapsAPILoader} from "angular2-google-maps/core";
import {FormControl} from "@angular/forms";
import {GeoLoc} from "../../shared/geo-loc.model";
import {HotelsService} from "../../shared/hotels.service";
import {Place} from "../../shared/place.model"
export declare var google: any;

@Component({
  selector: 'google-address-search',
  templateUrl: './google-address-search.component.html',
  styleUrls: ['./google-address-search.component.css']
})
export class GoogleAddressSearchComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public latitude: number;
  public longitude: number;
  public viewport: any;
  public searchControl: FormControl;

  @Input() placeholder: string = 'Enter location';
  @Output() onLocationSelected: EventEmitter<Place> = new EventEmitter<Place>();

  constructor(private mapsAPILoader: MapsAPILoader, private hotelService: HotelsService, private ngZone: NgZone) {

  }

  ngOnInit() {
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then((map) => {
      console.log(map)

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {country: "au"}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place = autocomplete.getPlace() as Place;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.viewport = place.geometry.viewport;
          this.onLocationSelected.emit(place);
        });
      });
    });
  }

  getRadius(bounds) {
    var swPoint = bounds.getSouthWest();
    var nePoint = bounds.getNorthEast();
    var swLat = swPoint.lat();
    var swLng = swPoint.lng();
    var neLat = nePoint.lat();
    var neLng = nePoint.lng();

    var proximitymeter = google.maps.geometry.spherical.computeDistanceBetween(swPoint, nePoint);
    var proximitymiles = proximitymeter * 0.000621371192;
    return proximitymiles;
  }

  close() {
    //this.dialogRef.close({lat: this.latitude, lng: this.longitude});
  }
}
