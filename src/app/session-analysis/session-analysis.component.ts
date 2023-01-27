import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { SessionAnalysisService } from './sessionanalysis.service';
declare var $: any;

@Component({
  selector: 'app-session-analysis',
  templateUrl: './session-analysis.component.html',
  styleUrls: ['./session-analysis.component.scss']
})
export class SessionAnalysisComponent implements OnInit {

  sessionanalysisObj: SessionAnalysisService;
  sessionData:any;
  LoginBot: any;
  range = ['day','monthly','yearly']
  dateForm = this.formBuilder.group({
    rangeType:'',
    admDateRange: this.formBuilder.group({
      startDate: '',
      endDate: '',
    })

  }); 

  constructor(private formBuilder: FormBuilder,sessionanalysisObj: SessionAnalysisService,private router: Router,private datePipe: DatePipe) {
    this.sessionanalysisObj = sessionanalysisObj;
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('LoginBot') == null || sessionStorage.getItem('LoginBot') == undefined
      || sessionStorage.getItem('LoginBot') == 'null' || sessionStorage.getItem('LoginBot') == 'undefined') {
      this.router.navigateByUrl('/login');
    }
    else {
      
      this.LoginBot = sessionStorage.getItem('LoginBot');
      const body = JSON.parse(this.LoginBot);
      body.start_date = "";
      body.end_date = "";
      body.format = 'day';

      this.TotalUniqueBotVisits(body);
      this.TotalBotConversation(body);
      this.InteractionRate(body);

    }

  }

  TotalUniqueBotVisits(body){

    this.sessionanalysisObj.GetSessionAnalysis(body).subscribe((res) => {

      if (true){//(!res.hasOwnProperty('status')) {

        var datawebsiteViewsChart = {
          labels: res.total_unique_bot_visits.labels,
          series: [
            res.total_unique_bot_visits.series,
          ]
        };
        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 10,
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
      else {
        this.showNotification(res.message, 4);
      }
    });
  }

  TotalBotConversation(body){
    
    this.sessionanalysisObj.GetSessionAnalysis(body).subscribe((res) => {
      if (true) {

        var datawebsiteViewsChart = {
          labels: res.total_convo.labels,
          series: [
            res.total_convo.series
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
        var TotalBotConversation = new Chartist.Bar('#TotalBotConversation', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        this.startAnimationForBarChart(TotalBotConversation);
      }
      else {
        this.showNotification(res.message, 4);
      }
    });
  }

  InteractionRate(body){

    this.sessionanalysisObj.GetSessionAnalysis(body).subscribe((res) => {

      if (true) {
        var datawebsiteViewsChart = {
          labels: res.interaction_rate.labels,
          series: [
            res.interaction_rate.series
          ]
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 150,
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
        var InteractionRate = new Chartist.Bar('#InteractionRate', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        this.startAnimationForBarChart(InteractionRate);
      }
      else {
        this.showNotification(res.message, 4);
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

  onFormSubmit() {

    var dateRange = this.dateForm.value
    const body = JSON.parse(this.LoginBot);
    body.start_date = this.datePipe.transform(dateRange.admDateRange.startDate, 'dd-MM-yyyy');
    body.end_date = this.datePipe.transform(dateRange.admDateRange.endDate, 'dd-MM-yyyy');
    body.format = dateRange.rangeType;

    this.TotalUniqueBotVisits(body);
    this.TotalBotConversation(body);
    this.InteractionRate(body);
    //this.dateForm.reset();
  }

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
