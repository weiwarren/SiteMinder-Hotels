import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'site-minder-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
