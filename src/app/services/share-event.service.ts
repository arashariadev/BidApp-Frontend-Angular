import { Injectable } from '@angular/core';
import { BidEvent } from '@app/classes/bid-event';
import { ShareEventNode } from '@app/classes/share-event-node';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareEventService {

  //behavior subject storing events array
private shareEventNode=new BehaviorSubject<ShareEventNode>(new ShareEventNode());
  

  constructor() { 
  }

  //function for setting ...
  setShareEventNode(shareEventNode:ShareEventNode){
    if(shareEventNode!=null){
    this.shareEventNode.next(shareEventNode);
    }
  }
  //function for receiving event array
  getShareEventNode(){
    return this.shareEventNode.asObservable();
  }

}
