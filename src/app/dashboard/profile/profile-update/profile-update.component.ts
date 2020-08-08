import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/classes/user';
import { UserService } from '@app/services/user.service';
import { SpinnerService } from '@app/services/spinner.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styles: [``]
})
export class ProfileUpdateComponent implements OnInit {
  @Input('user') updated_user:User;
  constructor(private userService:UserService,private spinner:SpinnerService) { }

  ngOnInit(): void {
  }

  profileUpdate(){

    this.userService.updateProfileByUser(this.updated_user).subscribe(resp=>
  {     
    this.spinner.remove();
    alert("profile updated successfully")
  },
  error=>{
    
    this.spinner.remove();
    alert(error);

  });
  
}
}
