import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
declare var $: any;

@Component({
  selector: 'app-intent-analysis',
  templateUrl: './intent-analysis.component.html',
  styleUrls: ['./intent-analysis.component.scss']
})
export class IntentAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.TopIntents();
    this.BarChartNumbersPerIntent();
    this.PieChartForPercentOfIntents();
    this.SentimentAnalysis();
  }

  TopIntents() {
    var datawebsiteViewsChart = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      series: [
        [5, 4, 3, 7, 5, 10, 3]
      ]
    };
    var optionswebsiteViewsChart = {
      horizontalBars: true,
      axisY: {
        showGrid: false,
        offset:100
      },
      seriesBarDistance: 10,
      low: 0,
      high: 10,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var TopIntents = new Chartist.Bar('#TopIntents', datawebsiteViewsChart, optionswebsiteViewsChart,responsiveOptions);
    this.startAnimationForBarChart(TopIntents);
  }

  BarChartNumbersPerIntent(){
    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [5, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var BarChartNumbersPerIntent = new Chartist.Bar('#BarChartNumbersPerIntent', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
    this.startAnimationForBarChart(BarChartNumbersPerIntent);
  }

  PieChartForPercentOfIntents(){
    var data = {
      series: [5, 3, 4]
    };
    
    var sum = function(a, b) { return a + b };
    
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    var PieChartForPercentOfIntents = new Chartist.Pie('#PieChartForPercentOfIntents', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    },responsiveOptions);

    this.startAnimationForBarChart(PieChartForPercentOfIntents);
  }

  SentimentAnalysis(){
    new Chartist.Bar('#SentimentAnalysis', {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
      ]
    }, {
      horizontalBars: true,
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000) + 'k';
        }
      }
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 30px'
        });
      }
    });
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
}
