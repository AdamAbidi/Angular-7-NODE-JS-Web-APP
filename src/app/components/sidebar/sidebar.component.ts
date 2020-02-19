import { Component, OnInit } from '@angular/core';
import { ConnectCrudService} from '../../connect-crud.service';


import { ChangeDetectorRef } from '@angular/core';



declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES1: RouteInfo[] = [
    { path: '/Web_Service_List', title: 'Web services list',  icon:'format_list_bulleted', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/input', title: 'Add web servcie',  icon: 'input', class: '' },
    { path: '/Delete_Web_Service', title: 'Edit Web Service',  icon:'edit', class: '' },
    { path: '/add_attribute', title: 'Add Input Output',  icon:'publish', class: '' },
    { path: '/Edit_Attribute', title: 'Edit Input Output',  icon:'content_paste', class: '' },


    //{ path: '/table-list', title: 'table-list',  icon:'content_paste', class: '' },
    //{ path: '/layouts', title: 'layout',  icon:'content_paste', class: '' },
    //{ path: '/adam', title: 'adam',  icon: 'dashboard', class: '' },
    //{ path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

export const ROUTES2: RouteInfo[] = [
  { path: '/Web_Service_List', title: 'Web services list',  icon:'format_list_bulleted', class: '' },
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/input', title: 'Add web servcie',  icon: 'input', class: '' },
  { path: '/Delete_Web_Service', title: 'Edit Web Service',  icon:'edit', class: '' },
  { path: '/add_attribute', title: 'Add Input Output',  icon:'publish', class: '' },
  { path: '/Edit_Attribute', title: 'Edit Input Output',  icon:'content_paste', class: '' },
//{ path: '/Output_generated', title: 'Generated output',  icon: 'play_arrow', class: '' },
//{ path: '/Output_expected', title: 'Expected output',  icon: 'done', class: '' },
//{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },

//{ path: '/table-list', title: 'table-list',  icon:'content_paste', class: '' },
//{ path: '/layouts', title: 'layout',  icon:'content_paste', class: '' },
//{ path: '/adam', title: 'adam',  icon: 'dashboard', class: '' },
//{ path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
//{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  perm :string  ;

  constructor(public permission:ConnectCrudService,private cdRef:ChangeDetectorRef) { }
  ngOnInit() {
    this.menuItems = ROUTES1.filter(menuItem => menuItem);
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  isPermit(){

    this.permission.currentMessage.subscribe(perm => this.perm=perm);
    if (this.perm ==="false"){this.menuItems = ROUTES1.filter(menuItem => menuItem); }
    else if(this.perm ==="true") {this.menuItems = ROUTES2.filter(menuItem => menuItem);}
    
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

}
