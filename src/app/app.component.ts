import { Component,OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { LoggedInUser } from '@app/classes/logged-in-user';
import { BidEvent } from '@app/classes/bid-event';
import { EventService } from '@app/services/event.service';
import { ShareEventService } from '@app/services/share-event.service';
import { ShareUserService } from '@app/services/share-user.service';
import { User } from '@app/classes/user';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``]
})
export class AppComponent implements OnInit{
  public logged_in_user:LoggedInUser;
  private event_list:BidEvent[]=[];
  public user:User;
  spinner_status:Boolean;

  constructor(public router:Router,public route:ActivatedRoute,public authService:AuthService,private eventService:EventService,
    public shareEvent:ShareEventService,private shareUser:ShareUserService,private spinner:SpinnerService) {

      /* call subscribe to get latest value */
    this.spinner.get().subscribe(resp=>this.spinner_status=resp);
   }
    
  ngOnInit() {
    
//getting all event list from http
    this.getAllEvents();

    this.authService.getLoggedInUser().subscribe(resp=>{
      this.logged_in_user=resp;
    });
   this.shareUser.getUser().subscribe(resp=>this.user=resp);
   }

   
   goToProfile(){
     this.router.navigate(['profile'])
   }

   ngDestroy(){
   }
   
   goToEvents(){
     this.router.navigate(['/events'],{relativeTo:this.route})
   }

   getAllEvents(){
  //receiving all events and storing in behavior subject.
    this.eventService.getEventList().subscribe(resp=>{

      this.spinner.remove();
      console.log(typeof resp.body.results);
      console.log("received events from http");
     this.event_list=resp.body.results;
     this.shareEvent.setShareEvents(this.event_list);},
    error=>{
    alert(error);
   this.spinner.remove(); 
  });
    
  }
  //new events if any,  are stored in above behavior subject...user needs to click search for this
  //event to take place
  refreshEvents(){
    console.log("refreshing.............");
    this.getAllEvents();

  }

 
  }
 
  
  

