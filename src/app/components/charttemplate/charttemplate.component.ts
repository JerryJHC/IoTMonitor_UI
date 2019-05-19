import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { ChartConfig } from "../../models/ChartConfig";

@Component({
  selector: 'app-charttemplate',
  templateUrl: './charttemplate.component.html',
  styleUrls: ['./charttemplate.component.css']
})
export class ChartTemplateComponent implements OnInit {

  ChartConfig: ChartConfig;

  Chart: Chart;

  @ViewChild('chartTag') ChartTag: ElementRef;

  constructor() { }

  ngOnInit() {
    this.ChartConfig = {
      title: "Test Chart",
      labels: ["A", "B", "C"],
      data: [10, 20, 30]
    };

    this.createChart();

  }

  createChart() {
    this.Chart = new Chart(this.ChartTag.nativeElement, {
      type: 'bar',
      data: {
        labels: this.ChartConfig.labels,
        datasets: [{
          label: this.ChartConfig.title,
          data: this.ChartConfig.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
