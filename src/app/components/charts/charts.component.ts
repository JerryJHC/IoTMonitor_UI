import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { ChartTemplate } from "../../models/ChartTemplate";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  ChartTemplate: ChartTemplate;

  Chart: Chart;

  @ViewChild('myChart') myChart: ElementRef;

  constructor() { }

  ngOnInit() {
    this.ChartTemplate = {
      title: "Test Chart",
      labels: ["A", "B", "C"],
      data: [10, 20, 30]
    };

    this.createChart();

  }

  createChart() {
    this.Chart = new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.ChartTemplate.labels,
        datasets: [{
          label: this.ChartTemplate.title,
          data: this.ChartTemplate.data,
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
