import {MapCentre} from "./map-centre.model";
export class GeoLoc implements MapCentre {
  lat: number;
  lng: number;
  zoom?: number;
  viewport?: any;
  constructor(lat: number, lng: number, zoom?: number, viewport?: any) {
    this.lat = lat;
    this.lng = lng;
    if (zoom) {
      this.zoom = zoom;
    }
    if (viewport) {
      this.viewport = viewport
    }
  }
}
