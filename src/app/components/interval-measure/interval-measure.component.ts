import { Component, OnInit } from '@angular/core';

import {ChartConfig} from '../../models/ChartConfig';
import {TimeRequest} from '../../models/TimeRequest';
import {FirebaseDataService} from '../../services/firebasedata.service';

@Component({
  selector: 'app-interval-measure',
  templateUrl: './interval-measure.component.html',
  styleUrls: ['./interval-measure.component.css']
})
export class IntervalMeasureComponent implements OnInit {

  hourly: ChartConfig = { data : [1,2,3] , labels : ["1","2","3"] , title : "Hello World" };

  constructor() { }

  ngOnInit() {
  }

}
