import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ShareUserService } from './share-user.service';

@Injectable({
  providedIn: 'root'
})
//read 'is_auctioneer' property from behavior subject 'user' 
export class CanAuctionGuardService implements CanActivate{

private can_auction:boolean;
  
  constructor(private router:Router,private authService:AuthService,private shareUser:ShareUserService) { }

  canActivate():boolean{

this.shareUser.getLoggedInUser().subscribe(resp=>this.can_auction=resp.profile["is_auctioneer"]);

if(this.can_auction){
  return true;
}

else { 
  
    //to inform user to refresh profile for storing latest changes in behavior subject 'user'
  alert("you are not an auctioneer...refresh your profile and try again");
  return false;
      }

}

}


