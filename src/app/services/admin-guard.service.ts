import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

//activate admin route for only admin

export class AdminGuardService implements CanActivate{

private is_staff:Boolean=false;

constructor(private router:Router,private route:ActivatedRoute) { }

canActivate():boolean{

    /* get 'is_staff' value from local storage:from token actually */

    this.is_staff=JSON.parse(localStorage.getItem('is_staff'));


    if(!this.is_staff){
    
      this.router.navigate(['/login'],{relativeTo:this.route})
      return false;
      }

    else
    {
      return true;

    }
  
  }


  
}
