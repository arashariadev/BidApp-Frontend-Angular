import { Component,OnInit } from '@angular/core';
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
  public loginStatus:Boolean=false;
  private event_list:BidEvent[]=[];
  public user:User;
  spinner_status:Boolean;
  public expiration:Date=null;

  constructor(public router:Router,public route:ActivatedRoute,public authService:AuthService,private eventService:EventService,
    public shareEvent:ShareEventService,private shareUser:ShareUserService,private spinner:SpinnerService) {

      /* call subscribe to get latest value */
    this.spinner.get().subscribe(resp=>this.spinner_status=resp);
   }
    
  ngOnInit() {
    
     /* getting all event list from server when app.component loades */
    this.getAllEvents();

    /* checks if user is logged in :from behavior subject */

    this.authService.getLoginStatus().subscribe(resp=>{
      this.loginStatus=resp;

      if(this.loginStatus){/* get token expiry time from local storage */
        this.expiration=JSON.parse(localStorage.getItem('exp'));
      }
    });

    /* get user from share-user.service */
   this.shareUser.getLoggedInUser().subscribe(resp=>this.user=resp);
   }

   
   goToProfile(){
     this.router.navigate(['profile'])
   }

   
   
   goToEvents(){
     this.router.navigate(['/events'],{relativeTo:this.route})
   }

   getAllEvents(){
  /* receiving all events and storing in behavior subject. */

    this.eventService.getEventList().subscribe(resp=>{

      this.spinner.remove();
      console.log(typeof resp.body.results);
      this.event_list=resp.body.results;
      this.shareEvent.setShareEvents(this.event_list);},
    error=>{
    alert(error);
   this.spinner.remove(); 
  });
    
  }
  
  /*  afetr click on 'search' button,new events are loaded from server */
  refreshEvents(){
    console.log("refreshing.............");
    this.getAllEvents();

  }

 
  }
 
  
  

