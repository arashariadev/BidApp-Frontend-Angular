import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/classes/user';
import { Profile } from '@app/classes/profile';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-user-update-by-admin',
  templateUrl: './user-update-by-admin.component.html',
  styles: [``
  ]
})
export class UserUpdateByAdminComponent implements OnInit {
  //received from parent component-->'admin component'-->see admin component html file
@Input('updated_user') updated_user:User;
  constructor(private authService:AuthService) {
   }

  ngOnInit(): void {
  }

  updateUser(){
    //code for updating user
    console.log(this.updated_user);
    this.authService.updateUserByAdmin(this.updated_user).subscribe(resp=>{
      alert("user is updated");
    },error=>{
      console.log(error);
      alert("error:"+error);
    })
   
  }
}
