import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from '@app/classes/user';
import { ShareUserService } from '@app/services/share-user.service';
import { UserService } from '@app/services/user.service';
import { SpinnerService } from '@app/services/spinner.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [``]
})

export class LoginComponent implements OnInit {

  /* to store username and password of user while login */
 public LoginUser;

 /* represents current logged in user-->null if no one */
 public username:string=null;

 //represents if anyone is logged in?
  public loginStatus:Boolean=false;


  constructor(private authService: AuthService,public router:Router,public route:ActivatedRoute,
    private shareUser:ShareUserService,private userService:UserService,private spinner:SpinnerService) {
   }
  
  ngOnInit() {

    /* get latest value of loginStatus from authService */
    this.authService.getLoginStatus().subscribe(resp=>{
      this.loginStatus=resp;
      
    });
    
    /* initialise values for login form */
    if(!this.loginStatus){
    this.LoginUser = {
      username: null,
      password: null
    };
  
  }
  //getting user details from 'user' behavior subject-->returns null if no one------
  this.shareUser.getLoggedInUser().subscribe(resp=>this.username=resp["username"]);
  
  }

  
  
  login() {
    
    this.authService.login({'username': this.LoginUser.username, 'password': this.LoginUser.password}).subscribe(
      resp=>{
        this.spinner.remove();
        this.LoginUser = {//extra protection
          username: null,
          password: null
        };
        /* clear out local storage first */
        localStorage.clear();

        //storing access token received in local storage
        localStorage.setItem('token',resp.body["access"]);
   
        /* getting user profile from server:token is send in header */
        this.getUserFromHttp();

      /* getting user profile image from amazon aws */
      this.getProfileImage();

    },
      error=>{
        this.spinner.remove();
      alert(error);
      
            });
  
     /* alert user about status */
    if(this.loginStatus){
        alert("logged in successfully!!!!");
            }
      
      
    }
 
  
 
  logout() {
    this.authService.logout();
    alert("logged out successfully!!!!!");
   
    this.router.navigate(['../events'],{relativeTo:this.route});
  }
 


  goToRegister(){
this.router.navigate(['../register'],{relativeTo:this.route})
  }

  goToProfile(){
    this.router.navigate(['../profile'],{relativeTo:this.route})
  }


  getUserFromHttp(){

     /* to get token paylaod and read 'exp' and 'is_staff' value from token */
     this.authService.updateData();


    this.authService.getUser().subscribe(resp=>
    {let user:User=resp.body;

      /* setting new user received in behavior subject 'user' */
      this.shareUser.setLoggedInUser(user);
      this.spinner.remove();},
      error=>{
        this.spinner.remove();
      alert("unable to get profile");
      });
  }


  /* get profile image */

  getProfileImage(){

    this.userService.getProfileImage().subscribe(resp=>{
      this.spinner.remove();
      this.shareUser.setProfileImage(resp.body);
      },error=>
      {this.spinner.remove();
        alert(error);
      });
  }
}
