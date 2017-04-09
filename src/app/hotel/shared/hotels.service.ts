import {Injectable, Inject, EventEmitter} from '@angular/core';
import {Hotel} from "./hotel.model";
import {MdDialogConfig, MdDialog, MdSnackBarConfig, MdSnackBar} from "@angular/material";
import {HotelDetailComponent} from "../components/hotel-detail/hotel-detail.component";
import {AngularFire, FirebaseListObservable, FirebaseRef} from "angularfire2";
import {GeoLoc} from "./geo-loc.model";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "rxjs";
import {SpinnerComponent} from "../components/spinner/spinner.component";
import {MapCentre} from "./map-centre.model";
var GeoFire = require('geofire');

@Injectable()
export class HotelsService {
  private _storeHotels: FirebaseListObservable<any>;
  private _hotels: ReplaySubject<Hotel[]>;
  private _geoFire;
  private _centre = new ReplaySubject<MapCentre>();
  private _bounds = new ReplaySubject<any>();
  private _hotelCentre = new ReplaySubject<Hotel>();
  private hotels: Hotel[] = [];

  public centre = this._centre.asObservable();
  public bounds = this._bounds.asObservable();
  public hotelCentre = this._hotelCentre.asObservable();
  public SEARCH_LIMIT = 5;
  public readonly DEFAULT_LOCATION = new GeoLoc(-33.8708, 151.2073, 15);

  constructor(public dialog: MdDialog, private af: AngularFire, private snackBar: MdSnackBar) {
    this._storeHotels = af.database.list('/hotels');
    this._hotels = new ReplaySubject<Hotel[]>();
    this._geoFire = new GeoFire(af.database.list('/geofire').$ref);
  }

  public auth() {
    return this.af.auth;
  }

  public getHotels() {
    return this._hotels.asObservable();
  }

  public setHotels(hotels: Hotel[]) {
    this.hotels = hotels;
    if(hotels){
      hotels.forEach(hotel => {
        this.saveHotel(hotel);
      })
    }
    this._hotels.next(this.hotels);
  }

  public getCustomHotels(centre?: GeoLoc, bounds?) {
    let keySubject = new Subject<string>();
    let hotels = [];
    console.log(this.getBoundsRadius(bounds));
    let geoQuery = this._geoFire.query({
      center: [centre.lat, centre.lng],
      radius: this.getBoundsRadius(bounds/1000)
    });

    geoQuery.on('key_entered', (key, location, distance) => {
      keySubject.next(key);
    });

    return keySubject.flatMap(key => this.af.database.list(`/hotels`, {
      query: {
        orderByKey: true,
        equalTo: key
      }
    })).filter(hotels => {
      return hotels[0] ? (hotels[0].custom == true) : false;
    } );
  }

  public mapHotelFromGooglePlace(gh: any) {
    if (gh) {
      let hotel = new Hotel();
      hotel.id = gh.id;
      hotel.name = gh.name;
      hotel.icon = gh.icon || null;
      hotel.opening_hours = gh.opening_hours || null;
      hotel.rating = gh.rating || null;
      hotel.vicinity = gh.vicinity || null;
      hotel.photos = gh.photos ? gh.photos[0].getUrl({maxWidth: 1024, maxHeight: 1024}) : '';
      hotel.lat = gh.geometry.location.lat();
      hotel.lng = gh.geometry.location.lng();
      return hotel;
    }
    return null;
  }

  public saveHotel(hotel: any) {

    return new Observable(observer => {
      if (this._storeHotels) {
        this.af.database.list("/hotels", {
          query: {
            orderByChild: 'id',
            equalTo: hotel.id || '-1'
          }
        }).first().subscribe(item => {
          if (item.length) {
            observer.next(false);
          }
          else {
            this._storeHotels.push(hotel).then(item => {
              if (item.key) {
                this._geoFire.set(item.key, [hotel.lat, hotel.lng]).then(function () {
                  observer.next(true);
                  console.log("Provided key has been added to GeoFire");
                }, function (error) {
                  observer.next(false);
                  console.log("Error: " + error);
                });
              }
            })
          }
        }, error => {
          observer.next(false);
        });
      }
    })

  }

  public openHotelDetail(hotel: Hotel) {
    let config = new MdDialogConfig();
    config.width = '50%';
    config.height = 'calc(100% - 50px)';
    let ref = this.dialog.open(HotelDetailComponent, config);
    ref.componentInstance.hotel = hotel;
    return ref;
  }

  public openLocationSearch() {
    // let config = new MdDialogConfig();
    // config.disableClose = true;
    // config.width = '50vw';
    // let ref = this.dialog.open(GoogleAddressSearchComponent, config);
    // return ref;
  }

  public requestLocation(): Observable<GeoLoc> {
    if ("geolocation" in navigator) {
      return Observable.create(observer => {
        navigator.geolocation.getCurrentPosition((position) => {
          let loc = new GeoLoc(position.coords.latitude, position.coords.longitude);
          observer.next(loc);
        }, (error) => {
          observer.error(error);
        });
      })
    }
    return Observable.throw(new Error("Browser does not support location service"));
  }

  public getBoundsRadius(bounds) {
    if (bounds) {
      var r = 6378.8
      var ne_lat = bounds.getNorthEast().lat() / 57.2958
      var ne_lng = bounds.getNorthEast().lng() / 57.2958
      var c_lat = bounds.getCenter().lat() / 57.2958
      var c_lng = bounds.getCenter().lng() / 57.2958
      var r_km = r * Math.acos(
          Math.sin(c_lat) * Math.sin(ne_lat) +
          Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
        )
      return r_km * 1000
    }
    else {
      return 10;
    }

  }

  public resetHotels() {
    this.hotels = [];
  }

  public setCentre(centre: MapCentre) {
    this._centre.next(centre);
  }

  public setMapBounds(bounds){
    this._bounds.next(bounds);
  }

  public focusHotel(hotel: Hotel) {
    this._hotelCentre.next(hotel);
    this.hotels.map(_hotel => _hotel.focused = (hotel == _hotel))
  }

  openSnackBar(message: string, action: string = "", duration: number = 0, args?: any) {
    let config = new MdSnackBarConfig();
    config.duration = duration;
    return this.snackBar.open(message, action, config);
  }

  private rad(x) {
    return x * Math.PI / 180;
  };

  public getDistance(p1, p2) {
    var R = 6378137;
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };

  openLoader(message: string, duration: number = 0, args?: any) {
    let config = new MdSnackBarConfig();
    config.duration = duration;
    let ref = this.snackBar.openFromComponent(SpinnerComponent, config);
    ref.instance.message = message;
    return ref;
  }
}
