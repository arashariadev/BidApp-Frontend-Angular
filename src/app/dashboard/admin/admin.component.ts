import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/classes/user';
import { Profile } from '@app/classes/profile';
import { ShareUserService } from '@app/services/share-user.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles:[`
  `]
})
export class AdminComponent implements OnInit {
  //show user details table?
public showTable:boolean=false;
//show user update table?
public updateTable=false;
public username:string=null;
public user:User;
public error:string;
public is_staff:boolean=false;
  constructor(private userService:UserService,private shareUser:ShareUserService) {
    this.user=new User(new Profile());
   }

  ngOnInit(): void {
  
  }

  onSearch(){
    this.updateTable=false;
    //getting user from http request
    this.userService.getUserByUsername(this.username).subscribe(resp=>{this.user=resp.body
    this.showTable=true;//table is displayed on successfully receiving user
    
  },error=>{this.error=error;
    alert(error);})
  }


onClickUpdateUser(){
  alert("are you sure!!!");
  this.updateTable=true;//update table is shown
  this.showTable=false;//show table is hidden

}


deleteUser(){
  alert("are you sure want to delete the user...use popup instead of alert");//:))
  this.userService.deleteUserByAdmin(this.username).subscribe(resp=>{
    
    if(resp.status==204){
      alert("user deleted");
    }
  },error=>{console.log(error);
  alert("error:"+error);})

}

//admin cannot delete himself--hard coding
isAdmin(){
  if(this.user.username==="sunilpie")
  return true;
  else
  return false;
}
}
