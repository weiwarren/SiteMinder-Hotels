import { Component, OnInit, Input } from '@angular/core';
import {Hotel} from "../../shared/hotel.model";

@Component({
  selector: 'hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  @Input()  hotel: Hotel;

  constructor() { }

  ngOnInit() {
  }

  bookmark(){
    alert('To be implemented');
  }
}
