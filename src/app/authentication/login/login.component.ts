import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { LoggedInUser } from '@app/classes/logged-in-user';
import {Observable} from 'rxjs';
import { $ } from 'protractor';
import { User } from '@app/classes/user';
import { ShareUserService } from '@app/services/share-user.service';
import { Profile } from '@app/classes/profile';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [``]
})
export class LoginComponent implements OnInit {

  //to store username and password of user while login
 public LoginUser;
 //represents current logged in user-->null if no one
 public username:string;;
 //represents if anyone is logged in?
  public loginStatus:boolean=false;
  constructor(private authService: AuthService,public router:Router,public route:ActivatedRoute,
    private shareUser:ShareUserService) {
   }
  
  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(resp=>{
      this.loginStatus=resp["loginStatus"];
      
    });
    
    if(!this.loginStatus){
    this.LoginUser = {
      username: null,
      password: null
    };
  
  }
  //getting user details from 'user' behavior subject-->returns null if no one------
  this.shareUser.getUser().subscribe(resp=>this.username=resp["username"]);
  
  }

  //ngDestroy() to prevent memory leak due to Behaviour subject
  
  login() {
    console.log("login()")
    this.authService.login({'username': this.LoginUser.username, 'password': this.LoginUser.password}).subscribe(
    //clearing out session storage
      resp=>{sessionStorage.clear();//extra protection
        //storing access token received in session storage
        console.log("token........"+resp.body["access"]);
        sessionStorage.setItem('token',resp.body["access"]);

      this.authService.updateData();
      //getting user profile after login---
      this.getUserFromHttp();

    },
      error=>{
      alert(error);
     }
    );
  
     //alert user about status
    if(this.loginStatus){
        alert("logged in successfully!!!!");
            }
      
      
    }
 
  
 
  logout() {
    this.authService.logout();
    alert("logged out successfully!!!!!");
    //setting null value in 'user' behavior subject after logout
    this.shareUser.setUser(new User(new Profile()))//update behavior subject containing user
    this.router.navigate(['../events'],{relativeTo:this.route});
  }
 


  goToRegister(){
this.router.navigate(['../register'],{relativeTo:this.route})
  }
  goToProfile(){
    this.router.navigate(['../profile'],{relativeTo:this.route})
  }


  getUserFromHttp(){
    this.authService.getUser().subscribe(resp=>
    {let user:User=resp.body;
      //setting new user received in behavior subject 'user'
      this.shareUser.setUser(user);
      console.log("got profile")},
      error=>{
      alert("unable to get profile");
      alert(error)});
  }
}
