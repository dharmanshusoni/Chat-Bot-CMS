import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Chartist from 'chartist';
declare var $: any;

@Component({
  selector: 'app-session-analysis',
  templateUrl: './session-analysis.component.html',
  styleUrls: ['./session-analysis.component.scss']
})
export class SessionAnalysisComponent implements OnInit {

  range = ['Monthly','Yearly']
  dateForm = this.formBuilder.group({
    rangeType:'',
    admDateRange: this.formBuilder.group({
      startDate: '',
      endDate: '',
    })

  }); 

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.TotalUniqueBotVisits();
    this.TotalBotConversation();
    this.InteractionRate();
  }

  TotalUniqueBotVisits(){
    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [5, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        //[5, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]// comparison bar chart 
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
    var TotalUniqueBotVisits = new Chartist.Bar('#TotalUniqueBotVisits', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
    this.startAnimationForBarChart(TotalUniqueBotVisits);
  }

  TotalBotConversation(){
    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

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
    var TotalBotConversation = new Chartist.Bar('#TotalBotConversation', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
    this.startAnimationForBarChart(TotalBotConversation);
  }

  InteractionRate(){
    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

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
    var InteractionRate = new Chartist.Bar('#InteractionRate', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
    this.startAnimationForBarChart(InteractionRate);
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

  onFormSubmit() {
    console.log(this.dateForm.value);
    this.dateForm.reset();
  }

}
