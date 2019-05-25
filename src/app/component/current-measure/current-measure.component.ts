import { Component, OnInit } from '@angular/core';
import { CurrentMeasure } from '../../models/CurrentMeasure';
import { FirebaseDataService } from '../../services/firebasedata.service'

@Component({
  selector: 'app-current-measure',
  templateUrl: './current-measure.component.html',
  styleUrls: ['./current-measure.component.css']
})
export class CurrentMeasureComponent implements OnInit {

  currentMeasure: CurrentMeasure = { datetime: new Date(), temperature: 20, humidity: 10, pressure: 900 };

  constructor(private firebaseData: FirebaseDataService) { }

  ngOnInit() {
    this.firebaseData.getTemperature().subscribe(temperature => {
      this.currentMeasure.temperature = temperature.value;
    });
  }

}
