export interface Place {
  geometry: {
    location: {
      lat: any;
      lng: any;
    }
    viewport: any
  },
  formatted_address: string;
  vicinity: string;
}
