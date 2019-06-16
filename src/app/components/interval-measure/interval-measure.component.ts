import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartConfig } from '../../models/ChartConfig';
import { TimeRequest } from '../../models/TimeRequest';
import { FirebaseDataService } from '../../services/firebasedata.service';
import { ChartTemplateComponent } from '../charttemplate/charttemplate.component';
import { SingleMeasure, Measures } from 'src/app/models/SingleMeasure';

@Component({
  selector: 'app-interval-measure',
  templateUrl: './interval-measure.component.html',
  styleUrls: ['./interval-measure.component.css']
})
export class IntervalMeasureComponent implements OnInit {

  // Temperature
  intervalTemperature: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Temperatura", xAxesLabel: "Hora", yAxesLabel: "Temperatura" };

  @ViewChild('intervalTemperatureChart') intervalTemperatureChart: ChartTemplateComponent;

  loadedIntervalT: boolean;

  // Humidity
  intervalHumidity: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Humedad", xAxesLabel: "Hora", yAxesLabel: "Humedad" };

  @ViewChild('intervalHumidityChart') intervalHumidityChart: ChartTemplateComponent;

  loadedIntervalH: boolean;

  //Pressure
  intervalPressure: ChartConfig = { data: [], labels: [], title: "", dataLabel: "Presión", xAxesLabel: "Hora", yAxesLabel: "Presión" };

  @ViewChild('intervalPressureChart') intervalPressureChart: ChartTemplateComponent;

  loadedIntervalP: boolean;

  constructor(private fireBaseDataService: FirebaseDataService) { }

  ngOnInit() {
    let timeRequest: TimeRequest = { startDateTime: this.addHours(new Date(), -1), endDateTime: new Date() };
    this.loadTemperature(timeRequest);
    this.loadHumidity(timeRequest);
    this.loadPressure(timeRequest);
  }

  //Handle button event
  loadMeasure(measure: Measures) {
    //Get inputs
    let sufix: string = measure == Measures.Temperature ? "T" : measure == Measures.Humidity ? "H" : "P";
    let inputStart: any = document.querySelector("input[name=inputStart" + sufix + "]");
    let inputEnd: any = document.querySelector("input[name=inputEnd" + sufix + "]");
    //Validate datetimes
    if (inputStart.value == "") {
      alert("No se asigno correctamente la fecha y hora de inicio");
      return;
    }
    if (inputEnd.value == "") {
      alert("No se asigno correctamente la fecha y hora de fin");
      return;
    }
    //Perform a request with the interval
    let timeRequest: TimeRequest = { startDateTime: new Date(inputStart.value), endDateTime: new Date(inputEnd.value) };
    switch (sufix) {
      case "T":
        this.loadTemperature(timeRequest);
        break;
      case "H":
        this.loadHumidity(timeRequest);
        break;
      case "P":
        this.loadPressure(timeRequest);
        break;
    }
  }

  //Temperature
  loadTemperature(timeRequest: TimeRequest) {
    this.loadedIntervalT = false;
    this.intervalTemperature.title = this.formatDateTime(timeRequest.startDateTime.toISOString()) + ' - ' + this.formatDateTime(timeRequest.endDateTime.toISOString());
    this.fireBaseDataService.getTemperatures(timeRequest).subscribe(data => this.loadedIntervalT = this.configureChart(data, this.intervalTemperature, this.intervalTemperatureChart), err => setTimeout(() => this.loadTemperature(timeRequest), 10 * 1000));
  }

  //Humidity
  loadHumidity(timeRequest: TimeRequest) {
    this.loadedIntervalH = false;
    this.intervalHumidity.title = this.formatDateTime(timeRequest.startDateTime.toISOString()) + ' - ' + this.formatDateTime(timeRequest.endDateTime.toISOString());
    this.fireBaseDataService.getHumidities(timeRequest).subscribe(data => this.loadedIntervalH = this.configureChart(data, this.intervalHumidity, this.intervalHumidityChart), err => setTimeout(() => this.loadHumidity(timeRequest), 10 * 1000));
  }

  //Pressure
  loadPressure(timeRequest: TimeRequest) {
    this.loadedIntervalP = false;
    this.intervalPressure.title = this.formatDateTime(timeRequest.startDateTime.toISOString()) + ' - ' + this.formatDateTime(timeRequest.endDateTime.toISOString());
    this.fireBaseDataService.getPressures(timeRequest).subscribe(data => this.loadedIntervalP = this.configureChart(data, this.intervalPressure, this.intervalPressureChart), err => setTimeout(() => this.loadPressure(timeRequest), 10 * 1000));
  }

  //Create or update Chart with data
  configureChart(data: SingleMeasure[], chartConfig: ChartConfig, chartTemplate: ChartTemplateComponent) {
    //Clean last data
    chartConfig.data = [];
    chartConfig.labels = [];
    //Format and insert new values
    data.forEach(d => {
      chartConfig.labels.push(this.formatDateTime(d.datetime));
      chartConfig.data.push(parseFloat(d.value.toFixed(2)));
    });
    //Create chart
    chartTemplate.createChart();
    return true;
  }

  //Date Utilities

  //Format DateTime d/m/yyyy H:mm
  formatDateTime(strDateTime: string) {
    let datetime = new Date(strDateTime);
    let minutes = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
    return '' + datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getUTCFullYear() + ' ' + datetime.getHours() + ':' + minutes;
  }

  //Add x hours to date
  addHours(date: Date, h: number) {
    date.setTime(date.getTime() + (h * 60 * 60 * 1000));
    return date;
  }

  //Add x minutes to date
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  //Classes

  setClasses(measure: Measures) {
    let classes = {
      'd-none': measure == Measures.Temperature ? this.loadedIntervalT : measure == Measures.Humidity ? this.loadedIntervalH : this.loadedIntervalP
    }
    return classes;
  }

}
