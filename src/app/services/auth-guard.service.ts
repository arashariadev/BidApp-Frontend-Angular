import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
private loginStatus:boolean=false;
  constructor(public auth: AuthService, public router: Router) {
   }
 //for profile
  canActivate(): boolean {
    this.auth.getLoggedInUser().subscribe(resp=>{
      this.loginStatus=resp["loginStatus"];});
    if (!this.loginStatus){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}