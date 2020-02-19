import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'app/fetch-data.service';

declare var $: any;


@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.scss']
})
export class EditAttributeComponent implements OnInit {
  DataContent:Array<any>;// All dataset content
  InputOutputContent:Array<any>;// All Input Output details content
  errorMessage:any ;//http errors

  verify :number; // verify if the button is clicked two times
  previous_id:number; // previous clicked id
  stored_id:number; //stored id
  new_name:string ; // rename
  new_desc:any; // new description
  display:boolean; //display the attributes of the chosen web service
  previous_display:any;
  current_content:Array<any> ; // current input output
  new_input:any // new input
  new_output:any // new output

  
  InputFile : string ; // Input File Name
  OutputFile : string ; // Output File Name

  isAvailable : boolean ; //boolean for toggle
  InputisAvailable: boolean ;// Input is selected or not
  OutputisAvailable: boolean ;// Output is selected or not
  
  input:any ; // auxiliary data structure
  output:any ;// auxiliary data structure

  constructor(private link:FetchDataService) { }

  ngOnInit() {

    this.DataContent=[];
    this.InputOutputContent=[];
    this.current_content=[];
    this.stored_id=0;
    this.errorMessage = "";
    this.new_name=""; 
    this.verify=0;
    this.previous_id=0;
    this.display=false ;
    //this.previous_display=false;

    this.previous_display=-1
    this.link.getContent('http://localhost:3000').subscribe(
      
      data => { this.DataContent=data; },
      error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
            }
    );
    this.link.getContent('http://localhost:3000/generated').subscribe(
      
      data => { this.InputOutputContent=data; },
      error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
            }
    );
    this.input =   {
      "input_content": "",
      "input_name": "",
    }
    this.output =   {
      "output_content": "",
      "output_name": "",
    }
    this.isAvailable=false ;
    this.InputisAvailable=false ;
    this.OutputisAvailable=false ;
  }

  show(i:number){
    if (this.previous_display == -1 || this.display==false){this.display= !this.display;console.log(this.previous_display)}
    else{
      if(this.previous_display == i){this.display= !this.display;console.log(this.previous_display)}
    }
    this.current_content=[];
    var j = this.DataContent[i].id ;
    console.log('j',j);
    var k = 0
    while (k < this.InputOutputContent.length && this.InputOutputContent[k].id_service <= j){
      if (j == this.InputOutputContent[k].id_service){this.current_content.push(this.InputOutputContent[k])}
      k++ ;}
  
    //console.log(this.current_content[0].id_service)
    this.previous_display=i ;
  }

  delete(n:any){
    if (this.previous_id==0){
      this.previous_id=this.InputOutputContent[n].id_service;
      this.showNotification('top','center',3,"would you like to delete this attribute"); 
    }
    else{
      if(this.previous_id==this.InputOutputContent[n].id_service){
        

        var data1 =   {
          "id_service": this.current_content[0].id_service,
          "id_input":  this.current_content[n].id_input,
        }
        //Used to delete the selected attribute
          this.link.post_Data(data1,'/Delete_ATR').subscribe(
        
            data => {
                     this.showNotification('top','center',2,"Attribute deleted");
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
        this.previous_id=this.InputOutputContent[n].id_service;
        this.showNotification('top','center',3,"would you like to delete this attribute");
      }
  
    }
  
  }
  public onChange1(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file)
    fileReader.onloadend = (e) => {
      this.InputFile = ""
      this.InputisAvailable=true
      this.InputFile = fileReader.result.toString()
      this.isAvailable=true
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
      this.isAvailable=true
      this.output.output_content=fileReader.result.toString()
      this.output.output_name=file.name
    }
  }


  edit(){
    console.log(this.input.input_name)
    console.log(this.output.output_name)

    if (!this.input.input_name && !this.output.output_name){
      this.showNotification('bottom','center',3,"Select a new file");
    }
    else {
      var aux_input : string = this.input.input_name
      var aux_output : string = this.output.output_name
      if(this.existe(aux_input,aux_output)){
        this.showNotification('bottom','center',3,"These changes already exist");
      }
      else{
        if (!this.output.output_name){
          var data1 = {
            "id_service": this.InputOutputContent[this.stored_id].id_service,
            "id_input": this.InputOutputContent[this.stored_id].id_input,
            "input_content": this.input.input_content,
            "input_name": this.input.input_name,
          }
          // Used for changing the input
          this.link.post_Data(data1,'/Change_input').subscribe(
        
            data => {
              this.showNotification('bottom','center',2,"Input updated");
              this.showNotification('bottom','center',2,"Please restart the server");
            },
            error => {
              this.errorMessage = error;
              console.log('erreur http ',error) 
            }
            );
          }
          else{
        if (!this.input.input_name){
          var data2 = {
            "id_service": this.InputOutputContent[this.stored_id].id_service,
            "id_input": this.InputOutputContent[this.stored_id].id_input,
            "output_content": this.output.output_content,
            "output_name": this.output.output_name,
          }
          // Used for changing the output
          this.link.post_Data(data2,'/Change_output').subscribe(
          
            data => {
              this.showNotification('bottom','center',2,"output updated");
              this.showNotification('bottom','center',2,"Please restart the server");
            },
            error => {
              this.errorMessage = error;
              console.log('erreur http ',error) 
            }
            );
          }

          else{
            var data3 = {
              "id_service": this.InputOutputContent[this.stored_id].id_service,
              "id_input": this.InputOutputContent[this.stored_id].id_input,
              "input_content": this.input.input_content,
              "input_name": this.input.input_name,
              "output_content": this.output.output_content,
              "output_name": this.output.output_name,
            }
            //Used for changing the input and the output
            this.link.post_Data(data3,'/Change_input_output').subscribe(
            
              data => {
                this.showNotification('bottom','center',2,"Attribute updated");
                this.showNotification('bottom','center',2,"Please restart the server");
              },
              error => {
                this.errorMessage = error;
                console.log('erreur http ',error) 
              }
              );

          }}
        }
      }
    }

  store(id:any){  this.stored_id=id; }


  existe(input:any, output:any):boolean{
    if (!input){input = this.current_content[this.stored_id].input_file_name}
    else{
      if (!output){output = this.current_content[this.stored_id].output_file_name}
    }
    var i = 0
    while (i<this.current_content.length){
      if (this.current_content[i].input_file_name === input && this.current_content[i].output_file_name === output){
        if (i != this.stored_id){return true}
      }
      i++
    }
  return false
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
