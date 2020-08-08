import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/classes/user';
import { UserService } from '@app/services/user.service';
import { SpinnerService } from '@app/services/spinner.service';

@Component({
  selector: 'app-user-update-by-admin',
  templateUrl: './user-update-by-admin.component.html',
  styles: [``
  ]
})
export class UserUpdateByAdminComponent implements OnInit {
  //received from parent component-->'admin component'-->see admin component html file
@Input('updated_user') updated_user:User;
  constructor(private userService:UserService,private spinner:SpinnerService) {
   }

  ngOnInit(): void {
  }

  updateUser(){
    //code for updating user
    this.userService.updateUserByAdmin(this.updated_user).subscribe(resp=>{
      this.spinner.remove();
      alert("user is updated");
    },error=>{
      this.spinner.remove();
      console.log(error);
      alert("error:"+error);
    })
   
  }
}
