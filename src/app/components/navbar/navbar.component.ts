import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES1,ROUTES2 } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataServiceService} from '../../share-data-service.service';
import { ConnectCrudService} from '../../connect-crud.service';

import { ChangeDetectorRef } from '@angular/core';



declare var $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;


    inputValue:string; //Admin Name 
    inputPass:string ; //Admin password
    message:string;    //Useful as a link between components

    ROUTES: RouteInfo[] ;

         
    public show: boolean = true;        //Authentification
    public show_bar: boolean = false;   //Authentification
    public buttonName: any = true;      //Authentification

    perm:string ; //CRUD Ability

 
    constructor(location: Location,  private element: ElementRef, private router: Router,public data:ShareDataServiceService ,public permission:ConnectCrudService,private cdRef:ChangeDetectorRef) {
          this.location = location;
          this.sidebarVisible = false;
          this.perm="false";

    }

    ngOnInit(){

    this.permission.currentMessage.subscribe(perm => this.perm=perm);
    
    //if (this.perm ==="false"){this.ROUTES=ROUTES1;}
    //else if(this.perm ==="true") {this.ROUTES=ROUTES2;}
    
    this.ROUTES=ROUTES1;
    
    this.listTitles = this.ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });

    this.inputPass="";
    this.inputValue="";
    this.data.currentMessage.subscribe(message=> this.message=message); 
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    onKey1(event) {this.inputValue = event.target.value;}

    onKey2(event) {this.inputPass = event.target.value;}
 
 

     connect() {
        if(this.inputValue === "adam" && this.inputPass === "abidi"){

                this.show = !this.show;
                if(this.show){ this.buttonName = false;}  
                else {this.buttonName = true;}
                this.show_bar = !this.show;
                this.data.changeMessage(this.inputValue.concat(this.inputPass));
                this.showNotification('bottom','center',1,"Welcome back Captain !");
                this.permission.changeMessage("true");  
            }
        else { this.showNotification('bottom','center',4,"Please type correctly your coordinations");}
    }


    disconnect(){
        this.show_bar = !this.show_bar;    
        this.show = !this.show_bar;
        this.showNotification('bottom','center',1,"Thank you for administring our instrument panel");
        this.permission.changeMessage("false");
        this.inputPass="";
        this.inputValue="";

    }

    ngAfterViewChecked(){
        this.cdRef.detectChanges();}

    showNotification(from, align,n:any,msg){
        const type = ['','info','success','warning','danger'];
  
        const color = n;
  
        $.notify({
            icon: "notifications",
            message: msg
  
        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
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
