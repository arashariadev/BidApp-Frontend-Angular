import { Component, OnInit } from '@angular/core';
import { Profile } from '@app/classes/profile';
import { RegisterService } from '@app/services/register.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { NewUser } from '@app/classes/new-user';
import { SpinnerService } from '@app/services/spinner.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [``]
})
export class RegisterComponent implements OnInit {
//store registered user
  user:NewUser;
  constructor(private authService:AuthService,private registerService:RegisterService,private router:Router,private route:ActivatedRoute,
    private spinner:SpinnerService) {
   }

  ngOnInit(): void {
//initialising with default null values-->see constructor of user 
    this.user=new NewUser(new Profile());
                 
    
  }

onSubmit(){
  this.registerService.registerUser(this.user).subscribe(resp=>
  {this.spinner.remove();
    if(resp.status==201){
      //if user is created
      alert("you have registered successfully");
  this.router.navigate(['../login',],{relativeTo:this.route});}
  },
  error=>{this.spinner.remove();
   alert(error)});
}
}