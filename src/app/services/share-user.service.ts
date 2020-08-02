import { Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import {User} from '@app/classes/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '@app/classes/profile';
import { ProfileImage } from '@app/classes/profile-image';

@Injectable({
  providedIn: 'root'
})
export class ShareUserService {
  //behavior subject for storing complete user profile
private shareUser=new BehaviorSubject<User>(new User(new Profile()));

/* stores user profile image */
private profileImage=new BehaviorSubject<ProfileImage>(new ProfileImage());
  constructor() {
    
   }


getUser():Observable<User>{
return this.shareUser.asObservable();
}

getProfileImage():Observable<ProfileImage>{
return this.profileImage.asObservable();
}

setUser(user:User){
  this.shareUser.next(user);
}

setProfileImage(profileImage:ProfileImage){

  this.profileImage.next(profileImage);
}

}
