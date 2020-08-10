import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute ,ParamMap} from '@angular/router';
import { BidEvent } from '@app/classes/bid-event';
import { Product } from '@app/classes/product';
import { AuthService } from '@app/services/auth.service';
import { ShareEventService } from '@app/services/share-event.service';
import { ShareUserService } from '@app/services/share-user.service';
import { BidService } from '@app/services/bid.service';
import { Bid } from '@app/classes/bid';
import { EventService } from '@app/services/event.service';
import { User } from '@app/classes/user';
import { Profile } from '@app/classes/profile';
import { ProductImage } from '@app/classes/product-image';
import { SpinnerService } from '@app/services/spinner.service';

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

  highest_bid:number=null;
  highest_bid_user:User=new User(new Profile());

  constructor(private router:Router,private route:ActivatedRoute,private shareEvent:ShareEventService,
    private authService:AuthService,private shareUser:ShareUserService,private bidService:BidService,private eventService:EventService,
     private spinner:SpinnerService) {}
  
  ngOnInit(): void {

    //initialising with default values
    this.event=new BidEvent(new Product(),new ProductImage);

//obtaining event_id from route parameters
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=parseInt(params.get('id'));
      this.event_id=id;
    });

    //obtaining event with given event_id from service providing 'events array'
    this.shareEvent.getShareEvents().subscribe(val=>{

      if(val.length!=0){
        this.event=val.filter(x=>x.id==this.event_id)[0];

        if(this.event!=null){//callback that is executed only after receiving event details
          
          /* this.authService.getLoggedInUser().subscribe(resp=>this.is_staff=resp["is_staff"])*/
          this.authService.getLoginStatus().subscribe(resp=>{

            if(resp){

              this.is_staff=JSON.parse(localStorage.getItem("is_staff"));
            }
          });
          /* get current datetime */

          const current_datetime=Date.now()
          /* get start date of event converted in milliseconds since epoch */
          const parsed_start_date=this.parse_date(this.event.start_date);//converts in milliseconds since epoch
          /* same for deadline of event */
          const parsed_deadline=this.parse_date(this.event.deadline);

          /* checks whether current time lies between startdate and deadline:to take bid */
       if(current_datetime>=parsed_start_date && current_datetime<parsed_deadline){

        /* it means user can bid for an event provided he's a bidder */
       this.can_bid=true;

       //getting 'is_bidder' property of currently logged in user
      this.shareUser.getLoggedInUser().subscribe(val=>this.is_bidder=val.profile["is_bidder"]);
                                                                                  }

        }
      
      }
      
    });

  }

  /* delete event option for admin */

  deleteEvent(){
    let answer=confirm("are you sure want to delete?");

    if(answer){

    this.eventService.deleteEventByAdmin(this.event_id).subscribe(resp=>
      {   this.spinner.remove(); 
        alert("successfully deleted")},error=>{
          this.spinner.remove();
          alert(error);
        });
    }
  }

  /* if user wants to bid */
  onClick(){
    this.take_bid=true;
  }


/* validate bid  */
validate_bid(){
if(this.user_bidprice>=this.event.base_price && this.user_bidprice<=100000000){

const current_datetime=new Date();
//storing time at which bid was placed -->for validation on server side

let bid=new Bid(this.user_bidprice,current_datetime);
//send bid
this.bidService.place_bid(bid,this.event.id).subscribe(resp=>
  {   this.spinner.remove(); 
    alert("bid successfully placed")},error=>
  {  this.spinner.remove();  
    alert(error);});

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
  
  /* get current highest bid */
  getHighestBid(){
    this.bidService.retrieveHighestBid(this.event_id).subscribe(resp=>
      {
        this.spinner.remove();
        this.highest_bid=resp.body["highest_bid"];
    this.highest_bid_user=resp.body["user"];
    },error=>
    {  this.spinner.remove();
      alert(error);
    })
  }

}
