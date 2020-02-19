import { Component, OnInit } from '@angular/core';
import { ShareDataServiceService} from '../share-data-service.service'

@Component({
  selector: 'app-output-expected',
  templateUrl: './output-expected.component.html',
  styleUrls: ['./output-expected.component.scss']
})
export class OutputExpectedComponent implements OnInit {
  message:string;

     
public show: boolean = false;
public buttonName: any = true;

  constructor(public data:ShareDataServiceService) { }

  ngOnInit() {

    this.data.currentMessage.subscribe(message=>{this.message=message;console.log(this.message);} )
    
}
 
toggle() {
    this.show = !this.show;
    if(this.show)
        this.buttonName = false;
    else
        this.buttonName = true;
}

}
