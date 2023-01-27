import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { IntentAnalysisService } from './intentanalysis.service';
declare var $: any;

@Component({
  selector: 'app-intent-analysis',
  templateUrl: './intent-analysis.component.html',
  styleUrls: ['./intent-analysis.component.scss']
})
export class IntentAnalysisComponent implements OnInit {

  intentObj: IntentAnalysisService;
  sessionData:any;
  fallbackData:any;
  LoginBot: any;

  constructor(private formBuilder: FormBuilder,intentObj: IntentAnalysisService,private router: Router) { 
    this.intentObj = intentObj;
    this.fallbackData = [];
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('LoginBot') == null || sessionStorage.getItem('LoginBot') == undefined
      || sessionStorage.getItem('LoginBot') == 'null' || sessionStorage.getItem('LoginBot') == 'undefined') {
      this.router.navigateByUrl('/login');
    }
    else {
      
      this.LoginBot = sessionStorage.getItem('LoginBot');
      const body = JSON.parse(this.LoginBot);

      this.TopIntents(body);
      this.BarChartNumbersPerIntent(body);
      this.PieChartForPercentOfIntents(body);
      this.SentimentAnalysis(body);
      this.FallbackData(body);
    }
    
  }

  TopIntents(body) {
    body.start_date = "";
    body.end_date = "";
    
    this.intentObj.GetTopIntent(body).subscribe((res) => {

      if (true) {
        var datawebsiteViewsChart = {
          labels: res.all_intents.labels,
          series: [
            res.all_intents.series
          ]
        };
        var optionswebsiteViewsChart = {
          horizontalBars: true,
          axisY: {
            showGrid: false,
            offset: 100
          },
          seriesBarDistance: 10,
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
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
        var TopIntents = new Chartist.Bar('#TopIntents', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        this.startAnimationForBarChart(TopIntents);
      } else { 
        this.showNotification(res.message, 4);
      }
    });
  }

  BarChartNumbersPerIntent(body){
    body.start_date = "";
    body.end_date = "";
    this.intentObj.GetExitIntent(body).subscribe((res) => {

      if (true) {
        var datawebsiteViewsChart = {
          labels: res.exit_intents.labels,
          series: [
            res.exit_intents.series,
          ]
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 10,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
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
      } else {
        this.showNotification(res.message, 4);
      }
    });
  }

  PieChartForPercentOfIntents(body){ 
    body.start_date = "";
    body.end_date = "";

    this.intentObj.GetExitIntentPercent(body).subscribe((res) => {
      if (true) {
        var data = {
          //labels: res.exit_intents_percent.labels,
          series: res.exit_intents_percent.series
        };

        var sum = function (a, b) { return a + b };

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
          labelInterpolationFnc: function (value,i) {
            return Math.round(value / data.series.reduce(sum) * 100) + '%' +' '+ res.exit_intents_percent.labels[i++];
          }
        }, responsiveOptions);

        this.startAnimationForBarChart(PieChartForPercentOfIntents);
      } else {
        this.showNotification(res.message, 4);
      }
    });
  }

  SentimentAnalysis(body){
    body.start_date = "";
    body.end_date = "";

    this.intentObj.GetSentiment(body).subscribe((res) => {
      if (true) {
        new Chartist.Bar('#SentimentAnalysis', {
          labels: res.sentiment_data.labels,
          series: [
            res.sentiment_data.series[0]
          ]
        }, {
          horizontalBars: true,
          stackBars: true,
          axisX: {
            labelInterpolationFnc: function (value) {
              return (value / 10);
            }
          }
        }).on('draw', function (data) {
          if (data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 10px'
            });
          }
        });
      } else {
        this.showNotification(res.message, 4);
      }
    });
  }

  FallbackData(body){
    body.start_date = "";
    body.end_date = "";

    this.intentObj.GetFallbackData(body).subscribe((res) => {
      this.fallbackData = res.fallback_data;
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

  showNotification(Message, type) {
    const types = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "notifications",
      message: Message

    }, {
      type: types[type],
      timer: 1000,
      placement: {
        from: 'top',
        align: 'center'
      },
      template:
        '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
