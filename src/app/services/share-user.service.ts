import { Injectable } from '@angular/core';
import {User} from '@app/classes/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '@app/classes/profile';
import { ProfileImage } from '@app/classes/profile-image';

@Injectable()

export class ShareUserService {
  
  /* behavior subject for storing complete user profile */

  private user=new BehaviorSubject<User>(ShareUserService.getUserFromLS());

  /* stores user profile image */
  private profileImage=new BehaviorSubject<ProfileImage>(new ProfileImage());
  
  constructor() {}

  
  //check local storage->if user not present ,create one
  public static getUserFromLS():User{

    let old_user=JSON.parse(localStorage.getItem("user"));
    if(old_user!=undefined && old_user!=null){
    return old_user;
    }
    return new User(new Profile());
  } 


  getLoggedInUser():Observable<User>{

    return this.user.asObservable();
  }


  setLoggedInUser(user:User){

    this.user.next(user);
  }


getProfileImage():Observable<ProfileImage>{
return this.profileImage.asObservable();
}


setProfileImage(profileImage:ProfileImage){

  this.profileImage.next(profileImage);
}

}
