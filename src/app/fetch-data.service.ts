import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http' ;
import {Observable} from 'rxjs' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { of } from 'rxjs';



declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  url1 ='http://localhost:3000';
  url2 ='http://localhost:3000/generated';


  
  constructor(protected httpClient : HttpClient) {  }


  errorHandler(error:HttpErrorResponse){
      return Observable.throw(error.message || "server error");
  }

  getContent(url:any):Observable<any>{
    return this.httpClient.get(url).catch(this.errorHandler);
  }

 
  post_web_service(data1:any,endpoint:string):Observable<any> { 
    this.getContent(this.url1).subscribe(
      data => {if (this.exist_web(data,data1)){
        this.showNotification('top','center',3,"This service already exists"); return of(false) ;}
               })
    return this.httpClient.post(this.url1+endpoint,JSON.stringify(data1), {
                headers: new HttpHeaders({'Content-Type': 'application/json'})}).catch(this.errorHandler); 
  }

  exist_web(tab:Array<any> , word:any):boolean{
    var i = 0 ;
    while(i < tab.length){
      if ( tab[i].name===word.name ){return true}
      else { i = i+1 }
    }
    return false 
  }

  post_web_service_detail(data1:any , endpoint:string):Observable<any> {  
    
    this.getContent(this.url2).subscribe(
      data => {if (this.exist_web_detail(data,data1)){
        this.showNotification('top','center',3,"This service already exists");return of(false) }
        if (!this.exist_web_detail(data,data1)){
          this.showNotification('top','center',2,"Attribute added to the database")
            this.showNotification('top','center',2,"Please restart the server")
          return this.httpClient.post(this.url1+endpoint,JSON.stringify(data1), {
          headers: new HttpHeaders({'Content-Type': 'application/json'})}).catch(this.errorHandler);}
    })
      this.showNotification('top','center',2,"Attribute added to the database")
        this.showNotification('top','center',2,"Please restart the server")
      return this.httpClient.post(this.url1+endpoint,JSON.stringify(data1), {
      headers: new HttpHeaders({'Content-Type': 'application/json'})}).catch(this.errorHandler);
 //   return of(true)
    
  }
    
  exist_web_detail(tab:Array<any> , word:any):boolean{
    var i = 0 ;
    while(i < tab.length){
      if ( tab[i].id_service===word.id_service && tab[i].input_file_name === word.input_name ){
        return true
      }
      else { i = i+1}
    }
    return false 
  }


  
 
  
  change_attribute_input_output(data:any){
    return this.httpClient.post('http://localhost:3000/Change_input_output',JSON.stringify(data), {
      headers: new HttpHeaders({'Content-Type': 'application/json'})}).catch(this.errorHandler);
  }
    
  post_Data(data:any,endpoint:string){
    return this.httpClient.post('http://localhost:3000'+endpoint,data).catch(this.errorHandler);
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
