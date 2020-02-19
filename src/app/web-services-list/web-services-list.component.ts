import { Component, OnInit} from '@angular/core';
import { HttpClient,HttpParameterCodec, HttpHeaders } from '@angular/common/http';
import { FetchDataService } from 'app/fetch-data.service';
import { ShareDataServiceService } from 'app/share-data-service.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { timer } from 'rxjs';
import { RequestOptions } from '@angular/http';
//import { verify } from 'crypto';
//import { readFileSync } from 'fs';


declare var $: any;

@Component({
  selector: 'app-web-services-list',
  templateUrl: './web-services-list.component.html',
  styleUrls: ['./web-services-list.component.scss']
})
export class WebServicesListComponent implements OnInit {
  
  DataContent:Array<any>;// All dataset content
  NameList:Array<any>; // The name list 
  i:any ; //Iterator
  public slected_input:any; //The current name
  public selected_id:any; //The current id 
  public selected_url:any;

  OutputList:Array<any>;// All the output content
  OutputContent:String;// Specified Output
  gen_out:any;// Generated output

  errorMessage:any ;//http errors
  message:any=0;

  fileToUpload: File = null;
  fileContent:string ;

  InputFileName:Array<any>
  OutputFileName : Array<any>
  constructor(private link:FetchDataService,public http:HttpClient ,public data:ShareDataServiceService) {  }

  ngOnInit(): void {
    this.i=0;
    this.NameList=[];
    this.slected_input="";
    this.selected_id=0;
    this.selected_url="";
    this.OutputContent="";
    this.gen_out="";
    this.errorMessage = "";
    this.fileContent = '';
    this.OutputFileName=[];

    this.link.getContent('http://localhost:3000').subscribe(
      
      data => {
               this.DataContent=data; console.log('total',this.DataContent.length);this.message=this.DataContent.length
               console.log(this.DataContent[this.DataContent.length-1].id)
               while(this.i  < this.DataContent.length){
                 this.NameList[this.i]= this.DataContent[this.i].name;
                 this.i++;
               }
              },
      error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
            }
    );

    this.link.getContent('http://localhost:3000/generated').subscribe(
      
      data => {
                  this.OutputList=data;
                  //console.log('fichier :',this.OutputList[5].file)

              }
    );

    this.data.changeMessage(this.message)
    this.OutputFileName=[];
    this.InputFileName=[];
    //console.log(readFileSync)
   // this.data.currentMessage.subscribe(message=>{this.message=message;console.log(this.message);} )

  }
  

  checkInput(list_id: number,event: any) {
    console.log(list_id);
    console.log(event.target.value);
    this.slected_input=event.target.value
    this.InputFileName=[];

    var id = this.DataContent[list_id].id
    console.log(id)
    var j=0
    var k=0 
    while(j < this.OutputList.length){
      if (this.OutputList[j].id_service == id){this.InputFileName[k]= this.OutputList[j].input_file_name;k++}
      j++;
    }
  }

  checkOutput(list_id: number) {
    console.log(list_id);
    this.OutputFileName=[];

    var id = this.DataContent[list_id].id
    var j=0
    var k=0 
    while(j < this.OutputList.length){
      if (this.OutputList[j].id_service == id){this.OutputFileName[k]= this.OutputList[j].output_file_name;k++}
      j++;
    }
  }

  RUN_service(n:any){

    console.log(JSON.stringify(this.InputFileName))
    
    const pos = this.show_content(this.DataContent[n].id,this.slected_input)
    var content= this.OutputList[pos].input_file_content
    
    this.OutputContent=this.OutputList[pos].output_file_content
    console.log(content)
    var end = this.extract_data2(JSON.stringify(content).split('"'))
    console.log('url',end)
    this.showNotification('top','center',2,"The service is running");
    this.http.get('/api/'+this.DataContent[n].URI+'?'+end).subscribe(
      res => {this.gen_out = JSON.stringify(res);
        if(this.OutputContent==res){
          this.OutputContent = JSON.stringify(this.OutputContent)
          this.errorMessage= "The service is not executed as expected";
          this.showNotification('top','center',4,this.errorMessage);
        }
        this.errorMessage= "The service is executed as expected";
        this.showNotification('top','center',2,this.errorMessage);},
      error => {
        console.log('erreur http',error.message);
        this.errorMessage=error.message;
        this.showNotification('top','center',4,"this service has an issue to fix");
        this.gen_out = "";});
    

  }
 
  show_content(id:any,input:any){
    var i = 0;
    while(i<this.OutputList.length){
      if (this.OutputList[i].id_service== id && this.OutputList[i].input_file_name==input){return i}
      i++
    }
  }
  extract_data(tab:Array<String>):string{
    console.log(tab)
    var i = 2
    var k = 0 //used to alternate
    var endpoint:string='';
    
    while(i<tab.length-1){
      endpoint+=tab[i].substr(0,tab[i].length-1)
      console.log('y not',tab[i].trim())
      if (k==1){endpoint+="&"}
      if (k==0){endpoint+="="}
      
      if(tab[i+1].length>2){
        if (tab[i+1].includes('}')){
          console.log(tab[i+1].substr(1,tab[i+1].length-6))
          endpoint+=tab[i+1].substr(1,tab[i+1].length-6)
          console.log('end',endpoint)
          k=1-k
        }
        if (tab[i+1].includes(',')){
          console.log(tab[i+1].substr(1,tab[i+1].length-7))
          endpoint+=tab[i+1].substr(1,tab[i+1].length-7)
          console.log('whatt',endpoint) 
          k=1-k
        }
        
      }
      i=i+2
      k=1-k
    }
    return endpoint
  }


  extract_data2(tab:Array<String>){
    var j = 2 
    var endpoint:string='';
    while(j<tab.length-1){
      var ch = tab[j].trim()
      if ((j % 2)==0){
        endpoint+=tab[j].trim().substr(0,tab[j].trim().length-1)+"="
      }
      else{
        if(tab[j].length>2){
          if (tab[j].includes('}')){
            endpoint+=tab[j].trim().substr(1,tab[j].trim().length-6)
            
          }
          if (tab[j].includes(',')){
            endpoint+=tab[j].trim().substr(1,tab[j].trim().length-7)+"&"
            
          }
          
        }
      }j++
    }
    
    endpoint = this.verify(endpoint)
    return endpoint
  }

  verify(endpoint:string){
    var tab : Array<any>
    var i = 0 ;
    var ch : string ;
    if(endpoint.search("=&")){
      
     tab = endpoint.split("=&")
     endpoint=tab.join("&")
    }
    if (endpoint[endpoint.length-1]=="="||endpoint[endpoint.length-1]=="&"){endpoint=endpoint.substr(0,endpoint.length-1)}
    return endpoint




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
