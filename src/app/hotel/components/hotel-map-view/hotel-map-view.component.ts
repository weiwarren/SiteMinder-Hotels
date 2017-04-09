import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {BehaviorSubject, Subject, ReplaySubject, Observable} from "rxjs";
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import {HotelsService} from "../../shared/hotels.service";
import {GeoLoc} from "../../shared/geo-loc.model";
import {MapCentre} from "../../shared/map-centre.model";

@Component({
  selector: 'hotel-map-view',
  templateUrl: './hotel-map-view.component.html',
  styleUrls: ['./hotel-map-view.component.css']
})
export class HotelMapViewComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public bounds: any;
  private mapContentCentre: ReplaySubject<MapCentre> = new ReplaySubject();
  public centreObservable: Observable<MapCentre> = this.mapContentCentre.asObservable();
  public centreChangedEvent = new EventEmitter<GeoLoc>();
  private centre: any;
  markers: any[] = [];

  constructor(private hotelService: HotelsService) {
    this.latitude = this.hotelService.DEFAULT_LOCATION.lat;
    this.longitude = this.hotelService.DEFAULT_LOCATION.lng;
    this.zoom = this.hotelService.DEFAULT_LOCATION.zoom;
  }

  ngOnInit() {
    this.hotelService.centre.distinctUntilChanged().subscribe(centre => {
      if (centre) {
        this.latitude = centre.lat;
        this.longitude = centre.lng;
        this.zoom = centre.zoom || this.zoom;
        this.mapContentCentre.next(centre);
      }
    });

    this.hotelService.hotelCentre.distinctUntilChanged().subscribe(centre => {
      if (centre) {
        this.latitude = centre.lat;
        this.longitude = centre.lng;
        this.zoom = centre.zoom || this.zoom;
      }
    });

    this.centreChangedEvent.debounceTime(1000).subscribe(centre => {
      let ref = this.hotelService.openSnackBar("", "Search this area");
      ref.onAction().debounceTime(2000).subscribe(() => {
        this.hotelService.setCentre(centre);
      });
    })
  }

  centerChanged(centre) {
    this.centre = new GeoLoc(centre.lat, centre.lng, this.zoom);
    this.centreChangedEvent.emit(this.centre);
  }

  markersChanged(markers) {
    this.hotelService.setHotels(markers);
  }

  markerClicked(marker) {
    this.markers.map(m => {
      m.focused = (marker == m)
    })
  }

  boundsChange(bounds){
    this.hotelService.setMapBounds(bounds);
  }
}
