import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router,ActivatedRoute} from'@angular/router';
import { User } from '@app/classes/user';
import { ShareUserService } from '@app/services/share-user.service';
import { ProfileImage } from '@app/classes/profile-image';
import { UserService } from '@app/services/user.service';
import { SpinnerService } from '@app/services/spinner.service';
import { environment } from 'environments/environment';
declare let Email: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
  `]
})
export class ProfileComponent implements OnInit {
  
  /* to store user details */
  user:User

  /* to update profile only if user clicks on 'update profile' button */

  public show_update_form:boolean=false;
  /* to store profile image object:it's an object containing image */
  public image_object:ProfileImage; 
  
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute,private shareUser:ShareUserService,
    private userService:UserService,private spinner:SpinnerService) { }


  ngOnInit(): void {
    //getting complete user from this service-->returns behavior subject 'user'
      this.shareUser.getLoggedInUser().subscribe(resp=>{
        this.user=resp;
      });

      this.shareUser.getProfileImage().subscribe(resp=>{
        this.image_object=resp;
        
      });

  }


/* after user clicks on 'update profile' button */
  updateProfile(){

    this.show_update_form=true;
  }


//take request from user to be abidder and auctioneer
  user_request(username,request_type){
    let value:string;
    if(request_type==='bid'){
      value="bidder";
    }
    
    if(request_type==='auction'){
      value="auctioneer";
    }
    this.spinner.add();
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "pie99954@gmail.com",
      Password : environment.smtp_secret,
      To : 'sunilpie1997@gmail.com',
      From : "pie99954@gmail.com",
      Subject : "bid-app-project",
      Body : `${username} wants to be a ${value}`
  }).then(
    message => {
      this.spinner.remove();
      if(message==='OK'){
        alert("email has been sent to admin.ThankYou");
      }
      else
      alert(message);
    }
  ).catch(this.emailErrorResp());

  }

  emailErrorResp(){
    alert("email could not be sent.Check internet connection");
   this.spinner.remove();
  }

/* functionality to send email to user :yet to be added */

//to again fetch profile from http sot that user doesn't need to reload or login again

  refreshProfile(){

    this.authService.getUser().subscribe(resp=>{
    this.spinner.remove();
    alert("refreshed your profile");
    let user:User=resp.body;
    this.shareUser.setLoggedInUser(user);
    localStorage.setItem("user",JSON.stringify(user));
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
