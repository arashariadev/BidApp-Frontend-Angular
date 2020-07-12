import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute ,ParamMap} from '@angular/router';
import { BidEvent } from '@app/classes/bid-event';
import { Product } from '@app/classes/product';
import { AuthService } from '@app/services/auth.service';
import { ShareEventService } from '@app/services/share-event.service';
import { ShareUserService } from '@app/services/share-user.service';
import { BidService } from '@app/services/bid.service';
import { Bid } from '@app/classes/bid';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styles: [``]
})
export class EventDetailComponent implements OnInit {
  //to obtain event id for which details need to be shown
  event_id:number=null;
  event:BidEvent=null;
  is_staff:boolean=false;
  can_bid:boolean=false;//if current datetime is between start date and end date of event
  is_bidder:boolean=false;
  take_bid:boolean=false;//only if user say yes:))
  user_bidprice:number=null;
  is_error:boolean=false;
  constructor(private router:Router,private route:ActivatedRoute,private shareEvent:ShareEventService,
    private authService:AuthService,private shareUser:ShareUserService,private bidService:BidService ) {
  console.log("event detail:"+this.event);
   }
  
  ngOnInit(): void {
    //initialising with default values
    this.event=new BidEvent(new Product());
//obtaining event_id from route parameters
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=parseInt(params.get('id'));
      this.event_id=id;
    });
    //obtaining event with given event_id from service providing 'events array'
    this.shareEvent.getShareEventNode().subscribe(val=>{
      if(val.event_list.length!=0){
        this.event=val.event_list.filter(x=>x.id==this.event_id)[0];
        console.log("helo..............")
        if(this.event!=null){//callback that is executed only after receiving event details
          console.log("2");
          const current_datetime=Date.now()
          const parsed_start_date=this.parse_date(this.event.start_date);//converts in milliseconds since epoch
          const parsed_deadline=this.parse_date(this.event.deadline);
       if(current_datetime>=parsed_start_date && current_datetime<parsed_deadline){
         console.log("3")
       this.can_bid=true;
       //getting 'is_bidder' property of currently logged in user
      this.shareUser.getUser().subscribe(val=>this.is_bidder=val.profile["is_bidder"])
      console.log(this.is_bidder+" "+this.can_bid)
       }
        }
      
      }
      
    });
    

 



  }

  onClick(){
    this.take_bid=true;
  }

  validate_bid(){
if(this.user_bidprice>=this.event.base_price){

const current_datetime=new Date();
//storing time at which bid was placed -->for validation on server side
console.log(current_datetime)

let bid=new Bid(this.user_bidprice,current_datetime);
//send bid
this.bidService.place_bid(bid,this.event.id).subscribe(resp=>
  {alert("bid successfully placed")},error=>
  {alert(error);});

this.take_bid=false;
  }

    else
    this.is_error=true;
    
  }

  parse_date(date:Date):number{
    return new Date(date).getTime();//returns milliseconds since epoch
  }

  goBack(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  
  

}
