import { Component, OnInit } from '@angular/core';
import { ShareDataServiceService} from '../share-data-service.service'
import { FetchDataService} from '../fetch-data.service' ;
import { HttpClient } from '@angular/common/http' ;
declare var $: any;


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  DataContent:Array<any>;// All dataset content

  service_name : string ;
  service_URI : string ;
  service_description : string ;
  service =   {
    "Name": "",
    "URI": "",
    "Description": "",
  }
  toggle:boolean=false ;
  message:any=0;
  InputFile : string ; // Input File Name
  OutputFile : string ; // Output File Name

  isAvailable : boolean ; //boolean for toggle
  InputisAvailable: boolean ;// Input is selected or not
  OutputisAvailable: boolean ;// Output is selected or not

  input:any ; // auxiliary data structure
  output:any ;// auxiliary data structure
  insert_id:number=0; //Item ID (DO NOT DELETE)

  constructor(public data:ShareDataServiceService,public link:FetchDataService,protected httpClient : HttpClient) {  }

  ngOnInit() {
    
    this.service_name="";
    this.service_description="";
    this.service_URI="";
    this.data.currentMessage.subscribe(message=> this.message=message);  
    this.isAvailable=false ;
    this.InputisAvailable=false ;
    this.OutputisAvailable=false ;

    this.input =   {
      "input_content": "",
      "input_name": "",
    }
    this.output =   {
      "output_content": "",
      "output_name": "",
    }
   
  }

  onKey1(event) {this.service_name = event.target.value;}

  onKey2(event) {this.service_URI = event.target.value;}

  onKey3(event) {this.service_description = event.target.value;}


  
  
  showNotification(from, align,n:any,msg){
    if (n==0){}
    const type = ['','info','success','warning','danger'];

    const color = Math.floor(n);

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

  Insert_web_service(){
    if (!this.service_URI || !this.service_description || !this.service_name){this.showNotification('top','center',3,"please fulfill all the text areas");}
    else{
    this.service.Name=this.service_name;
    this.service.URI=this.service_URI;
    this.service.Description=this.service_description;
    console.log('service',this.service);
    this.link.post_web_service(this.service,'/service').subscribe(
      (res) => { this.showNotification('top','center',2,"Service posted") },
      (error) => { this.showNotification('top','center',4,"An error has occured") });
    }  
  }
  
  activate (){
    if (!this.service_URI || !this.service_description || !this.service_name){this.showNotification('top','center',3,"please fulfill all the text areas");}
    else {this.toggle= !this.toggle ;}
    this.link.getContent('http://localhost:3000/').subscribe(
      
      data => {this.DataContent=data;
        this.insert_id=1+this.DataContent[this.DataContent.length-1].id;
       
      },
        
      error => {console.log('erreur http ',error) }
    ); 
  }
    
  submit2():void{
    /*if (!this.service_URI || !this.service_description || !this.service_name){this.showNotification('top','center',3,"please fulfill all the text areas");}
    else{
    this.service.Name=this.service_name;
    this.service.URI=this.service_URI;
    this.service.Description=this.service_description;
    console.log('service',this.service);
    this.link.post_web_service(this.service,'/service').subscribe(
      (res) => { this.showNotification('top','center',2,"Service posted") },
      (error) => { this.showNotification('top','center',4,"An error has occured") });
    }  */
    
    console.log(this.insert_id)
 //   if (this.insert_id==0){this.showNotification('top','center',3,"Something is missing");}
 //   else{
      var data={
        "id_service":this.insert_id,
        "input_content":this.input.input_content,
        "input_name":this.input.input_name,
        "output_content":this.output.output_content,
        "output_name":this.output.output_name,
        }
        console.log(data)
     /* this.link.post_web_service_detail(data,'/service_add_detail').subscribe(
        (res) => { this.showNotification('top','center',2,"Service posted") },
        (error) => { console.error('erreue',error); });*/
 //   }
  } 
}
