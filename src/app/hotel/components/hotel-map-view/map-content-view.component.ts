import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import {Subject, BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {HotelsService} from "../../shared/hotels.service";
import {GeoLoc} from "../../shared/geo-loc.model";
import {Hotel} from "../../shared/hotel.model";
import {MapCentre} from "../../shared/map-centre.model";
declare var google: any;
@Component({
  selector: 'map-content',
  template: ''
})
export class MapContentComponent implements OnInit {
  @Input() markers: any[];
  @Input() bounds: any;
  @Input() centre: ReplaySubject<GeoLoc | Hotel>;
  @Output() markersChange = new EventEmitter<any>();
  @Output() boundsChange = new EventEmitter<any>();
  placeService: any;

  constructor(public mapsAPIWrapper: GoogleMapsAPIWrapper, private hotelService: HotelsService) {

  }

  ngOnInit() {
    let self = this;
    this.mapsAPIWrapper.getNativeMap().then(map => {
      this.placeService = new google.maps.places.PlacesService(map);
      this.centre.debounceTime(1000).subscribe(centre => {
        if (centre) {
          let bounds = map.getBounds();
          this.searchNearByGoogle(centre, bounds);
          this.searchNearByStore(centre, bounds);
        }
      })

    })
  }

  searchNearByStore(centre: MapCentre, bounds) {
    this.hotelService.getCustomHotels(centre, bounds).subscribe(hotels => {
      let index = -1;
      let hotel = hotels[0]
      this.markers.forEach((marker, i) => {
        if(marker.lat == hotel.lat && marker.lng == hotel.lng){
          index = i;
        }
      })
      if (index > -1) {
        this.markers[index] = hotel;
      }
      else {
        this.markers.push(hotel);
      }
    });
  }

  searchNearByGoogle(centre: MapCentre, bounds) {
    let notification = this.hotelService.openLoader("Searching Nearby Hotels");
    this.placeService.nearbySearch(
      {
        location: {lat: centre.lat, lng: centre.lng},
        radius: this.hotelService.getBoundsRadius(bounds),
        type: ['lodging']
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.markers = [];
          this.bounds = new google.maps.LatLngBounds();
          for (var i = 0; i < Math.min(this.hotelService.SEARCH_LIMIT, results.length); i++) {
            let hotel = this.hotelService.mapHotelFromGooglePlace(results[i]);
            if (centre.hasOwnProperty('id') && centre.lat == hotel.lat && centre.lng == hotel.lng) {
              hotel.focused = true;
            }
            this.bounds.union(results[i].geometry.viewport);
            hotel.distance = this.hotelService.getDistance(centre, hotel);
            this.markers.push(hotel);
          }
          this.markersChange.emit(this.markers);
          this.boundsChange.emit(this.bounds);
          notification.dismiss();
        }
      }
    );
  }


}
