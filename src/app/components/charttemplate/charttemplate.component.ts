import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { ChartConfig } from "../../models/ChartConfig";

@Component({
  selector: 'app-charttemplate',
  templateUrl: './charttemplate.component.html',
  styleUrls: ['./charttemplate.component.css']
})
export class ChartTemplateComponent implements OnInit {

  @Input() ChartConfig: ChartConfig;

  Chart: Chart;

  @ViewChild('chartTag') ChartTag: ElementRef;

  constructor() { }

  ngOnInit() { }

  createChart() {
    this.Chart = new Chart(this.ChartTag.nativeElement, {
      type: 'line',
      data: {
        labels: this.ChartConfig.labels,
        datasets: [{
          label: this.ChartConfig.dataLabel,
          data: this.ChartConfig.data,
          backgroundColor: 'tomato',
          borderWidth: 1,
          borderColor: 'red',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.ChartConfig.title
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.ChartConfig.xAxesLabel
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.ChartConfig.yAxesLabel
            }
          }]
        }
      }
    });
  }

}
