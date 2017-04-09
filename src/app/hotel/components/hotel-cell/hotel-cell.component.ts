import { Component, OnInit, Input, Output } from '@angular/core';
import {Hotel} from "../../shared/hotel.model";
import {HotelsService} from "../../shared/hotels.service";

@Component({
  selector: 'hotel-cell',
  templateUrl: './hotel-cell.component.html',
  styleUrls: ['./hotel-cell.component.css']
})
export class HotelCellComponent implements OnInit {
  @Input() hotel: Hotel;

  constructor(public hotelService: HotelsService) { }

  ngOnInit() {
  }

  openHotelDetail(hotel: Hotel){
    let ref = this.hotelService.openHotelDetail(hotel);
  }
}
