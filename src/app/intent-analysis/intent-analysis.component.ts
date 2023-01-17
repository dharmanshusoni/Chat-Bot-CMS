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
