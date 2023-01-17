import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from 'app/components/sidebar/module.service';
import { SidebarComponent } from 'app/components/sidebar/sidebar.component';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginServiceObj: LoginService;
  moduleServiceObj: ModuleService;
  userModel: any;
  bot_id:any;
  client:string;
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,loginServiceObj: LoginService,moduleServiceObj: ModuleService,private router: Router) {
    this.userModel = {};
    this.loginServiceObj = loginServiceObj;
    this.moduleServiceObj = moduleServiceObj;
  }

  initialize() {
    this.userModel = {};
    this.userModel.email = '';
    this.userModel.password = '';
    this.userModel.client = this.client;
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.client = params['client'];
      this.initialize();
      if(this.client == undefined || this.client == 'undefined' || this.client == '' || this.client == null || this.client == 'null'){
        this.showNotification("Error while fetching url", 4);
      }
      if(this.client == 'company'){
        this.showNotification("Type company in URL {company}", 3);
      }
    });
  }

  signin() {
    this.loginServiceObj.Login(this.userModel).subscribe((res) => {
      console.log(res);
      if (res.status == 'Success') {
        this.showNotification('Logged In Successfull', 2);
        this.bot_id = res.bot_id;
        sessionStorage.setItem('LoginBot', res.bot_id); 
        this.router.navigateByUrl('/dashboard');
      }
      else {
        this.showNotification(res.message, 4);
      }
    });
  }

  showNotification(Message, type) {
    const types = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "notifications",
      message: Message

    }, {
      type: types[type],
      timer: 4000,
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
