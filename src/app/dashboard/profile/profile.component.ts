import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router,ActivatedRoute} from'@angular/router';
import { User } from '@app/classes/user';
import { ShareUserService } from '@app/services/share-user.service';
import { ProfileImage } from '@app/classes/profile-image';
import { UserService } from '@app/services/user.service';
import { SpinnerService } from '@app/services/spinner.service';
declare let Email: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
  `]
})
export class ProfileComponent implements OnInit {
  //to store user details
  user:User
  public show_update_form:boolean=false;
  public image_object:ProfileImage; 
  
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute,private shareUser:ShareUserService,
    private userService:UserService,private spinner:SpinnerService) { }

  ngOnInit(): void {
    //getting complete user from this service-->returns behavior subject 'user'
      this.shareUser.getUser().subscribe(resp=>{
        this.user=resp;
      });
      this.shareUser.getProfileImage().subscribe(resp=>{
        this.image_object=resp;
        console.log(JSON.stringify(this.image_object));
      })
  }



  updateProfile(){

    this.show_update_form=true;
  }


//take request from user to be abidder and auctioneer
  user_request(username,request_type){
    let value:string;
    if(request_type==='bid'){
      alert("bid request processing");
      value="bidder";
    }
    else
    if(request_type==='auction'){
      alert("auction request processing");
      value="auctioneer";
    }
//sending email
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "pie99954@gmail.com",
      Password : "7D2959372FBB172F93194EECAEB0ABFF622A",
      To : 'sunilpie1997@gmail.com',
      From : "pie99954@gmail.com",
      Subject : "Bid_app",
      Body : username+" wants to be a "+value
  }).then(

    message => {alert(message);
    console.log("email sent")}
  );
  }
//to again fetch profile from http sot that user doesn't need to reload
//new user details if present will be stored in behavior subject so that all components receive same details.
  refreshProfile(){
    this.authService.getUser().subscribe(resp=>{
    this.spinner.remove();
    alert("refreshed");
      this.shareUser.setUser(resp.body);
  }
    ,error=>{
      this.spinner.remove();
      alert(error);});

    this.userService.getProfileImage().subscribe(resp=>{
  
      this.spinner.remove();
      this.shareUser.setProfileImage(resp.body);
    })
  }

  
}
