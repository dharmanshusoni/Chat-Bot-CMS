import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'app/components/sidebar/module.service';
import { SidebarComponent } from 'app/components/sidebar/sidebar.component';
import { HomeService } from './home.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles = [
    {title:"Super admin",logo:"",color:""},
    {title:"Farm owner",logo:"",color:""},
    {title:"IPM",logo:"",color:""},
    {title:"Grower",logo:"",color:""},
    {title:"Office staff",logo:"",color:""},
    {title:"Applicator",logo:"",color:""},
    {title:"Worker",logo:"",color:""},
  ];

  constructor(private router: Router) {
    
  }

  initialize() {
    
  }

  ngOnInit() {
    this.initialize();
  }

  alert(msg){
    //alert(msg);
    this.router.navigateByUrl('/login');
  }
}
