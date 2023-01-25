import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionTableService } from './sessiontable.service';
declare var $: any;

@Component({
  selector: 'app-session-table',
  templateUrl: './session-table.component.html',
  styleUrls: ['./session-table.component.scss']
})
export class SessionTableComponent implements OnInit {
  
  sessionServiceObj: SessionTableService;
  LoginBot: any;
  sessionData:any;
  showID='';

  constructor(sessionServiceObj: SessionTableService, private router: Router, private http: HttpClient) {
    this.sessionServiceObj = sessionServiceObj;
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

      this.sessionServiceObj.GetSessionTable(body).subscribe((res) => {
        if (!res.hasOwnProperty('status')) {
          console.log(res);
          this.sessionData = res;
        }
        else {
          this.showNotification(res.message, 4);
        }
      });
    }
  }

  getID(ID:any){
    if(this.showID == ID)
     return this.showID = "";
    
     return this.showID = ID;
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
