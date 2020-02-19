import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject' ;

@Injectable({
  providedIn: 'root'
})
export class ShareDataServiceService {

  private messageSourse = new BehaviorSubject<any>(0) ;
  currentMessage = this.messageSourse.asObservable();

  constructor() { }

  changeMessage(message:any){
    this.messageSourse.next(message);
  }
}
