import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

private loginStatus:Boolean=false;
  constructor(public auth: AuthService, public router: Router) {
   }
 

  canActivate(): boolean {

    this.auth.getLoginStatus().subscribe(resp=>{

      this.loginStatus=resp;});
    
      if (!this.loginStatus){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}