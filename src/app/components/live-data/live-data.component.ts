import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfig } from 'src/app/models/ChartConfig';
import { FirebaseDataService } from 'src/app/services/firebasedata.service';
import { ChartTemplateComponent } from '../charttemplate/charttemplate.component';
import { Observable, observable } from 'rxjs';
import { SingleMeasure } from 'src/app/models/SingleMeasure';

//Select list values
enum Measures {
  Temperature = 1,
  Humidity = 2,
  Pressure = 3
}

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

  //Create default chart
  ngOnInit() {
    this.liveDataChart.ChartConfig = this.liveTemperature;
    this.liveDataChart.createChart();
    this.getLastMeasures();
  }

  getLastMeasures() {
    // Temperature
    this.fireBaseDataService.getLastTemperature().subscribe(temperature => {
      this.updateValues(temperature[0], this.liveTemperature.labels, this.liveTemperature.data);
    });

    // Humidity
    this.fireBaseDataService.getLastHumidity().subscribe(humidity => {
      this.updateValues(humidity[0], this.liveHumidity.labels, this.liveHumidity.data);
    });

    // Pressure
    this.fireBaseDataService.getLastPressure().subscribe(pressure => {
      this.updateValues(pressure[0], this.livePressure.labels, this.livePressure.data);
    });

    //Request last measures
    setTimeout(() => this.getLastMeasures(), 20 * 1000);
  }

  //Add the new value and remove the old to keep last 10
  updateValues(tData: SingleMeasure, labels: string[], data: number[]) {
    let fDateTime = this.formatDateTime(tData.datetime);
    if (labels[labels.length - 1] !== fDateTime) {
      //Insert new data
      labels.push(fDateTime);
      data.push(parseFloat(tData.value.toFixed(2)));
      //Keep last 10 values
      if (labels.length > 10) {
        data.shift();
        labels.shift();
      }
      this.liveDataChart.Chart.update();
    }
  }

  //Change the config used by the Chart
  updateConfig(source: Measures) {
    if (source == Measures.Humidity) {
      this.liveDataChart.ChartConfig = this.liveHumidity;
    } else if (source == Measures.Pressure) {
      this.liveDataChart.ChartConfig = this.livePressure;
    } else {
      this.liveDataChart.ChartConfig = this.liveTemperature;
    }
    //Recreate chart
    this.liveDataChart.Chart.clear();
    this.liveDataChart.Chart.destroy();
    this.liveDataChart.createChart();
  }

  //Format DateTime d/m/yyyy H:mm
  formatDateTime(strDateTime: string) {
    let datetime = new Date(strDateTime);
    let minutes = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
    return '' + datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getUTCFullYear() + ' ' + datetime.getHours() + ':' + minutes;
  }

  //Change event Handler
  changeSource(event: any) {
    this.updateConfig(event.target.value);
  }

}
