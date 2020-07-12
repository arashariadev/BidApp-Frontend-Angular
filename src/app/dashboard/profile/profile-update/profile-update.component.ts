import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/classes/user';
import { Profile } from '@app/classes/profile';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styles: [``]
})
export class ProfileUpdateComponent implements OnInit {
  @Input('user') updated_user:User;
  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  profileUpdate(){
this.userService.updateProfileByUser(this.updated_user).subscribe(resp=>
  alert("profile updated successfully"),
  error=>alert(error));
  }
}
