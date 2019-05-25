import { Component, OnInit } from '@angular/core';
import { CurrentMeasure } from '../../models/CurrentMeasure';

@Component({
  selector: 'app-current-measure',
  templateUrl: './current-measure.component.html',
  styleUrls: ['./current-measure.component.css']
})
export class CurrentMeasureComponent implements OnInit {

  currentMeasure: CurrentMeasure;

  constructor() { }

  ngOnInit() {
    this.currentMeasure = { datetime : new Date() , temperature : 20 , humidity : 10 , pressure : 900 };
  }

}
