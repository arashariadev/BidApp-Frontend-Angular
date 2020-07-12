import { Component, OnInit, Input } from '@angular/core';
import {EventService} from '@app/services/event.service';
import { BidEvent } from '@app/classes/bid-event';
import { ShareEventService } from '@app/services/share-event.service';
import { ShareEventNode } from '@app/classes/share-event-node';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styles: [`
  `]
})
export class EventListComponent implements OnInit {

 public eventListObject:ShareEventNode;
  constructor(private eventService:EventService,public shareEvent:ShareEventService) { 
  
  }

  ngOnInit(): void {
    //obtaining all events from this service--->returns behavior subject containing events array
    this.shareEvent.getShareEventNode().subscribe(value=>this.eventListObject=value);
    console.log("displaying new list");
  }
}
