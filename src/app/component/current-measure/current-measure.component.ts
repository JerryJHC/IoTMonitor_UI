import { Component, OnInit } from '@angular/core';
import { CurrentMeasure } from '../../models/CurrentMeasure';
import { FirebaseDataService } from '../../services/firebasedata.service'

@Component({
  selector: 'app-current-measure',
  templateUrl: './current-measure.component.html',
  styleUrls: ['./current-measure.component.css']
})
export class CurrentMeasureComponent implements OnInit {

  currentMeasure: CurrentMeasure = { datetime: '---', temperature: null, humidity: null, pressure: null };

  progress: number;

  constructor(private firebaseData: FirebaseDataService) { }

  ngOnInit() {
    this.getLatestMeasures();
  }

  getLatestMeasures() {
    //Mark progress
    this.progress = 0;

    //Request latest measures
    this.firebaseData.getLastTemperature().subscribe(temperature => {
      this.currentMeasure.temperature = temperature[0].value;
      this.setDateTime(new Date(temperature[0].datetime));
      this.progress++;
    });
    this.firebaseData.getLastHumidity().subscribe(humidity => {
      this.currentMeasure.humidity = humidity[0].value;
      this.progress++;
    });
    this.firebaseData.getLastPressure().subscribe(pressure => {
      this.currentMeasure.pressure = pressure[0].value;
      this.progress++;
    });
  }

  //Format Last Measure DateTime
  setDateTime(datetime: Date) {
    console.log(datetime);
    this.currentMeasure.datetime = '' + datetime.getDate() + '/' + (datetime.getMonth() +1) + '/' + datetime.getUTCFullYear() + ' ' + datetime.getHours() + ':' + datetime.getHours();
  }

  //Set Dynamic classes
  setClasses() {
    let classes = {
      'd-none': this.progress == 3
    }
    return classes;
  }

}
