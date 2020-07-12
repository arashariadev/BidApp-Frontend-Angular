import { Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import {User} from '@app/classes/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '@app/classes/profile';

@Injectable({
  providedIn: 'root'
})
export class ShareUserService {
  //behavior subject for storing complete user profile
private shareUser=new BehaviorSubject<User>(new User(new Profile()));

  constructor() {
    
   }


getUser():Observable<User>{
return this.shareUser.asObservable();
}

setUser(user:User){
  this.shareUser.next(user);
}

}
