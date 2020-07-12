import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

//activate admin route for only admin
export class AdminGuardService implements CanActivate{
private loginStatus:boolean=false;
private is_staff:boolean=false;

constructor(public authService:AuthService,private router:Router,private route:ActivatedRoute) { }

canActivate():boolean{
//receiving values from behavior subject 'LoggedInUser'
  this.authService.getLoggedInUser().subscribe(value=>{this.loginStatus=value["loginStatus"];
this.is_staff=value["is_staff"]  ;
});

  if(!this.loginStatus || !this.is_staff){
    this.router.navigate(['/login'],{relativeTo:this.route})
  return false;
}
else{
  return true;

}
}

}
