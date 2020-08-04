import { Component, OnInit } from '@angular/core';
import { BidEvent } from '@app/classes/bid-event';
import { Product } from '@app/classes/product';
import { EventService } from '@app/services/event.service';
import { ProductImage } from '@app/classes/product-image';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styles: [``]
})
export class EventCreateComponent implements OnInit {
public event:BidEvent;
//initially true so that errors are not shown
public is_start_date_valid:boolean=true;
public is_deadline_valid:boolean=true;
public is_error:boolean=false;
  constructor(private eventService:EventService) { 
    //initialising new BidEvent object with default values 
    this.event=new BidEvent(new Product(),new ProductImage());
  }

  ngOnInit(): void {
  }
//parse date-->used for start_date and deadline of event object
  parse_date(date:Date):number{
    return new Date(date).getTime();//returns milliseconds since epoch
  }

  validate_start_date():boolean{
    //true when start_date is 30 hours ahead of now 
  const current_date=Date.now();
    const  parsed_start_date=this.parse_date(this.event.start_date)
    const hours=Math.floor((parsed_start_date-current_date)/(1000*3600));
    if(hours>=30){
      return true;
    }
    else
    return false;
  }

  //true when deadline is atleast 2 hours ahead
  validate_deadline():boolean{
    const parsed_deadline=this.parse_date(this.event.deadline);
    const parsed_start_date=this.parse_date(this.event.start_date);
    const hours:number=Math.floor((parsed_deadline-parsed_start_date)/(1000*3600));
    if(hours>=2){
      return true;
    }
    else
    return false;
  }

validate_baseprice(){
if(this.event.base_price>=1 && this.event.base_price<=10000000){
this.is_error=false;
return true;
    }
    else
    this.is_error=true;
    return false;
  }

onSubmit(){
  this.validate_baseprice();
  //setting values to decide if errors are present in either....
  this.is_start_date_valid=this.validate_start_date();//showing error if there is....
  this.is_deadline_valid=this.validate_deadline();//showing error if there is ....
  if(this.is_start_date_valid && (this.is_deadline_valid && !this.is_error)){

  this.eventService.addEventByAuctioneer(this.event).subscribe(resp=>{
    if(resp.status==201){
   alert("event created successfully");
    }},error=>alert(error));

}
}
}