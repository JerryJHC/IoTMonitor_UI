import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartConfig } from '../../models/ChartConfig';
import { TimeRequest } from '../../models/TimeRequest';
import { FirebaseDataService } from '../../services/firebasedata.service';
import { ChartTemplateComponent } from '../charttemplate/charttemplate.component';

@Component({
  selector: 'app-interval-measure',
  templateUrl: './interval-measure.component.html',
  styleUrls: ['./interval-measure.component.css']
})
export class IntervalMeasureComponent implements OnInit {

  // Temperature
  intervalTemperature: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Temperatura", xAxesLabel: "Hora", yAxesLabel: "Temperatura" };

  @ViewChild('intervalTemperatureChart') intervalTemperatureChart: ChartTemplateComponent;

  // Humidity
  intervalHumidity: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Humedad", xAxesLabel: "Hora", yAxesLabel: "Humedad" };

  @ViewChild('intervalHumidityChart') intervalHumidityChart: ChartTemplateComponent;

  //Pressure
  intervalPressure: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Presión", xAxesLabel: "Hora", yAxesLabel: "Presión" };

  @ViewChild('intervalPressureChart') intervalPressureChart: ChartTemplateComponent;

  constructor(private fireBaseDataService: FirebaseDataService) { }

  ngOnInit() {
    let timeRequest: TimeRequest = { startDateTime: this.addHours(new Date(), -1), endDateTime: new Date() };
    this.loadTemperature(timeRequest);
    this.loadHumidity(timeRequest);
    this.loadPressure(timeRequest);
  }

  loadTemperature(timeRequest: TimeRequest) {
    this.intervalTemperature.title = this.formatDateTime(timeRequest.startDateTime.toISOString()) + ' - ' + this.formatDateTime(timeRequest.endDateTime.toISOString());
    this.fireBaseDataService.getTemperatures(timeRequest).subscribe(
      data => {
        this.intervalTemperature.data = [];
        this.intervalTemperature.labels = [];
        data.forEach(d => {
          this.intervalTemperature.labels.push(this.formatDateTime(d.datetime));
          this.intervalTemperature.data.push(parseFloat(d.value.toFixed(2)));
        });
        this.intervalTemperatureChart.createChart();
      });
  }

  loadHumidity(timeRequest: TimeRequest) {
    this.intervalHumidity.title = this.formatDateTime(timeRequest.startDateTime.toISOString()) + ' - ' + this.formatDateTime(timeRequest.endDateTime.toISOString());
    this.fireBaseDataService.getHumidities(timeRequest).subscribe(
      data => {
        this.intervalHumidity.data = [];
        this.intervalHumidity.labels = [];
        data.forEach(d => {
          this.intervalHumidity.labels.push(this.formatDateTime(d.datetime));
          this.intervalHumidity.data.push(parseFloat(d.value.toFixed(2)));
        });
        this.intervalHumidityChart.createChart();
      });
  }

  loadPressure(timeRequest: TimeRequest) {
    this.intervalPressure.title = this.formatDateTime(timeRequest.startDateTime.toISOString()) + ' - ' + this.formatDateTime(timeRequest.endDateTime.toISOString());
    this.fireBaseDataService.getPressures(timeRequest).subscribe(
      data => {
        this.intervalPressure.data = [];
        this.intervalPressure.labels = [];
        data.forEach(d => {
          this.intervalPressure.labels.push(this.formatDateTime(d.datetime));
          this.intervalPressure.data.push(parseFloat(d.value.toFixed(2)));
        });
        this.intervalPressureChart.createChart();
      });
  }

  formatDateTime(strDateTime: string) {
    let datetime = new Date(strDateTime);
    let minutes = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
    return '' + datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getUTCFullYear() + ' ' + datetime.getHours() + ':' + minutes;
  }

  addHours(date: Date, h: number) {
    date.setTime(date.getTime() + (h * 60 * 60 * 1000));
    return date;
  }

}
