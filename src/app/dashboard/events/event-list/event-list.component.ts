import { Component, OnInit, Input } from '@angular/core';
import {EventService} from '@app/services/event.service';
import { BidEvent } from '@app/classes/bid-event';
import { ShareEventService } from '@app/services/share-event.service';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styles: [`
  `]
})
export class EventListComponent implements OnInit {

 public eventList:BidEvent[]=[];

 /* contains all events initially (before user applies any filter */
 public filtered_set:BidEvent[]=[];
 public filter_date:Date=null;
  constructor(private eventService:EventService,public shareEvent:ShareEventService) { 
  
  }

  ngOnInit(): void {
    //obtaining all events from this service--->returns behavior subject containing events array

    this.shareEvent.getShareEvents().subscribe(value=>{this.eventList=value;
    this.filtered_set=this.eventList;
    });
    console.log("displaying new list");
  }

  filtering(inputdate:Date){
    this.filtered_set=this.eventList.filter(x=>x.start_date>=inputdate);

  }
}
