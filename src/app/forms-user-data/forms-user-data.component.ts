import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUsersService } from './form-user.service';
declare var $: any;

@Component({
  selector: 'app-forms-user-data',
  templateUrl: './forms-user-data.component.html',
  styleUrls: ['./forms-user-data.component.scss']
})
export class FormsUserDataComponent implements OnInit {

  formServiceObj: FormUsersService;
  formData:any;
  LoginBot: any;
  dateForm = this.formBuilder.group({
    rangeType:'',
    admDateRange: this.formBuilder.group({
      startDate: '',
      endDate: '',
    })

  }); 
  constructor(private formBuilder: FormBuilder,formObj: FormUsersService,private router: Router,private datePipe: DatePipe) {
    this.formServiceObj = formObj;
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('LoginBot') == null || sessionStorage.getItem('LoginBot') == undefined
      || sessionStorage.getItem('LoginBot') == 'null' || sessionStorage.getItem('LoginBot') == 'undefined') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.LoginBot = sessionStorage.getItem('LoginBot');
      const body = JSON.parse(this.LoginBot);
      this.FormTable(body);
    }
  }

  FormTable(body){
    body.start_date = '';
    body.end_date = '';
    this.formServiceObj.GetFormData(body).subscribe((res) => {
      if (!res.hasOwnProperty('status')) {
        this.formData = res;
        console.log(this.formData);
        //this.LastIntentList = res.filter((item, i, arr) => arr.findIndex((t) => t.last_intent=== item.last_intent) === i);
      }
      else {
        this.showNotification(res.message, 4);
      }
    });
  }

  onFormSubmit() {

    var dateRange = this.dateForm.value
    const body = JSON.parse(this.LoginBot);
    body.start_date = this.datePipe.transform(dateRange.admDateRange.startDate, 'YYYY-MM-dd');
    body.end_date = this.datePipe.transform(dateRange.admDateRange.endDate, 'YYYY-MM-dd');
    this.formServiceObj.GetFormData(body).subscribe((res) => {
      if (!res.hasOwnProperty('status')) {
        this.formData = res;
        console.log(this.formData);
        //this.LastIntentList = res.filter((item, i, arr) => arr.findIndex((t) => t.last_intent=== item.last_intent) === i);
      }
      else {
        this.showNotification(res.message, 4);
      }
    });
  }

  @Input() items = [];

  isArray(value) {
    return value instanceof Array
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
