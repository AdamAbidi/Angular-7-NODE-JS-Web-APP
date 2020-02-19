import { Component, OnInit } from '@angular/core';

import { FetchDataService } from 'app/fetch-data.service';
import { ShareDataServiceService } from 'app/share-data-service.service';
declare var $: any;

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss']
})
export class AddAttributeComponent implements OnInit {
  DataContent:Array<any>;// All dataset content
  public selected_id:any; //The current id (DO NOT DELETE)
  errorMessage:any ;//http erros
  message:any=0;
  insert_id=0; //Item ID (DO NOT DELETE)

  InputFile : string ; // Input File Name
  OutputFile : string ; // Output File Name

  isAvailable : boolean ; //boolean for toggle
  InputisAvailable: boolean ;// Input is selected or not
  OutputisAvailable: boolean ;// Output is selected or not

  input:any ; // auxiliary data structure
  output:any ;// auxiliary data structure
  filesToUpload: Array<File>; // not sure
  fd = new FormData();// not sure

  constructor(public data:ShareDataServiceService,public fetch:FetchDataService) {this.filesToUpload = []; }

 
  ngOnInit(): void {
    this.selected_id=0;
    this.errorMessage = "";

    this.fetch.getContent('http://localhost:3000/').subscribe(
      
      data => {this.DataContent=data;},
      error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
            }
    );
     
  
    this.data.changeMessage(this.message)
    
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

  selectChangeHandler (event: any) {
    this.selected_id= event.target.selectedIndex;
    console.log('give me id',this.DataContent[this.selected_id-1].id)
    this.insert_id=this.DataContent[this.selected_id-1].id;
  }

  

  public onChange1(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file)
    fileReader.onloadend = (e) => {
      this.InputFile = ""
      this.InputisAvailable=true
      this.InputFile = fileReader.result.toString()
      if (this.InputisAvailable && this.OutputisAvailable){this.isAvailable=true}
      this.input.input_content=fileReader.result.toString()
      this.input.input_name=file.name
    } 
  }


  public onChange2(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file)
    fileReader.onloadend = (e) => {
      this.OutputFile = ""
      this.OutputisAvailable=true
      this.OutputFile = fileReader.result.toString()
      if (this.InputisAvailable && this.OutputisAvailable){this.isAvailable=true}
      this.output.output_content=fileReader.result.toString()
      this.output.output_name=file.name
    }
  }

  
 
  public submit(){
    if (this.insert_id==0){this.showNotification('top','center',3,"please select a service");}
    else{
      var data={
        "id_service":this.insert_id,
        "input_content":this.input.input_content,
        "input_name":this.input.input_name,
        "output_content":this.output.output_content,
        "output_name":this.output.output_name,
        }
        console.log(data)
      this.fetch.post_web_service_detail(data,'/service_add_detail').subscribe(
        (res) => {  },
        (error) => { console.error('erreue',error); });
    }
  }



  notif(n){
    if (n==0){this.showNotification('top','center',3,"please select a service");}
    else{this.showNotification('top','center',1,this.DataContent[n-1].description)}
  }

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

}
  
