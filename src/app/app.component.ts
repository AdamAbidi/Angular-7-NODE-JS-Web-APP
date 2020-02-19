import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public perm :any;

  nameEventHander($event: any) {
    this.perm = $event;
    console.log('I am the father and I got :',this.perm);
  }

 
 
}
