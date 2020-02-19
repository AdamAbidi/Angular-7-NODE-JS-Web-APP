import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject' ;



@Injectable({
  providedIn: 'root'
})
export class ConnectCrudService {
  private messageSourse = new BehaviorSubject<string>("false") ;
  currentMessage = this.messageSourse.asObservable();

  constructor() { }

  changeMessage(message:string){
    this.messageSourse.next(message);

}


}
