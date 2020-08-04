import { Injectable } from '@angular/core';
import { BidEvent } from '@app/classes/bid-event';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareEventService {

  //behavior subject storing events array
private shareEvents=new BehaviorSubject<BidEvent[]>([]);
  

  constructor() { 
  }

  //function for setting ...
  setShareEvents(events:BidEvent[]){
    
    this.shareEvents.next(events);
    
  }
  //function for receiving event array
  getShareEvents(){
    return this.shareEvents.asObservable();
  }

}
