import { Component, OnInit } from '@angular/core';
import { ShareDataServiceService } from 'app/share-data-service.service';
import { FetchDataService } from 'app/fetch-data.service';

declare var $: any;


@Component({
  selector: 'app-delete-web-service',
  templateUrl: './delete-web-service.component.html',
  styleUrls: ['./delete-web-service.component.scss']
})
export class DeleteWebServiceComponent implements OnInit {
  DataContent:Array<any>;// All dataset content
  errorMessage:any ;//http errors

  verify :number; // verify if the button is clicked two times
  previous_id:number; // previous clicked id
  stored_id:number; //stored id
  new_name:string ; // rename
  new_desc:any; // new description

  constructor(private link:FetchDataService) { }

  ngOnInit() {

    this.DataContent=[];
    this.stored_id=0;
    this.errorMessage = "";
    this.new_name=""; 
    this.verify=0;
    this.previous_id=0;

    this.link.getContent('http://localhost:3000').subscribe(
      
      data => { this.DataContent=data; },
      error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
            }
    );
  }

onKey1(event) {this.new_name = event.target.value;}

delete(n:any){
  if (this.previous_id==0){
    this.previous_id=this.DataContent[n].id;
    this.showNotification('top','center',3,"would you like to delete this service and its components");
    
  }
  else{
    if(this.previous_id==this.DataContent[n].id){
      var data =   {
        "id": this.previous_id,
      }
        this.link.post_Data(data,'/Delete_Web_Service').subscribe(
      
          data => {
                   this.showNotification('top','center',2,"Service deleted");
                   this.showNotification('top','center',2,"Please restart the server");
                  },
          error => {
                    this.errorMessage = error;
                    console.log('erreur http ',error) 
                }
        );
        this.previous_id=0
    }
    else{
      this.previous_id=this.DataContent[n].id;
      this.showNotification('top','center',3,"would you like to delete this service and its components");
    }

  }

}

  rename(){
    if(this.new_name===""){this.showNotification('bottom','center',3,"Please insert a correct name");}
    else{
      var data =   {
        "id": this.DataContent[this.stored_id].id,
        "name": this.new_name,
      }
      this.link.post_Data(data,'/Rename_Web_Service').subscribe(
      
        data => { this.showNotification('bottom','center',2,"Service renamed");
                  this.showNotification('bottom','center',2,"Please restart the server");},
        error => {
                  this.errorMessage = error;
                  console.log('erreur http ',error) 
              }
      );
    }

}

store(id:any){  this.stored_id=id; }

onKey2(event) {this.new_desc = event.target.value;}


rewrite_desc(){
  if(this.new_desc===""){this.showNotification('bottom','center',3,"Please enter the new description");
                         this.showNotification('bottom','center',2,"Please restart the server");}
  else{
    var data =   {
      "id": this.DataContent[this.stored_id].id,
      "description": this.new_desc,
    }
    this.link.post_Data(data,'/Rewrite_Web_Desc').subscribe(
    
      data => { this.showNotification('bottom','center',2,"Service renamed");},
      error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
            }
    );
  }


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
