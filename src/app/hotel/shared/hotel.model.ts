import {MapCentre} from "./map-centre.model";
export class Hotel implements MapCentre{
  id: string;
  lat: number;
  lng: number;
  zoom?: number;
  name: string;
  description: string;
  icon: string;
  opening_hours: any;
  photos:any;
  rating: number;
  vicinity: string;
  focused: boolean;
  distance: number;
  custom: boolean = false;
}
