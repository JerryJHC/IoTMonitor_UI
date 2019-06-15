import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfig } from 'src/app/models/ChartConfig';
import { FirebaseDataService } from 'src/app/services/firebasedata.service';
import { ChartTemplateComponent } from '../charttemplate/charttemplate.component';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})
export class LiveDataComponent implements OnInit {

  // Temperature
  liveTemperature: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Temperatura", xAxesLabel: "Hora", yAxesLabel: "Temperatura" };

  // Humidity
  liveHumidity: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Humedad", xAxesLabel: "Hora", yAxesLabel: "Humedad" };

  // Pressure
  livePressure: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Presión", xAxesLabel: "Hora", yAxesLabel: "Presión" };

  @ViewChild('liveDataChart') liveDataChart: ChartTemplateComponent;

  constructor(private fireBaseDataService: FirebaseDataService) { }

  ngOnInit() {
    this.liveDataChart.ChartConfig = this.liveTemperature;
    this.liveDataChart.createChart();
    this.getLastMeasure();
  }

  getLastMeasure() {
    this.fireBaseDataService.getLastTemperature().subscribe(temperature => {
      let fDateTime = this.formatDateTime(temperature[0].datetime);
      if (this.liveTemperature.labels[this.liveTemperature.labels.length - 1] !== fDateTime) {
        //Insert new data
        this.liveTemperature.labels.push(fDateTime);
        this.liveTemperature.data.push(parseFloat(temperature[0].value.toFixed(2)));
        //Keep last 10 values
        if (this.liveTemperature.labels.length > 10) {
          this.liveTemperature.data.shift();
          this.liveTemperature.labels.shift();
        }
        this.liveDataChart.Chart.update();
      }
      //Request last measure
      setTimeout(() => this.getLastMeasure(), 30 * 1000);
    });
  }

  formatDateTime(strDateTime: string) {
    let datetime = new Date(strDateTime);
    let minutes = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
    return '' + datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getUTCFullYear() + ' ' + datetime.getHours() + ':' + minutes;
  }

}
