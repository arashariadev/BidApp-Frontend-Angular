import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { ShareUserService } from '@app/services/share-user.service';
import { ProfileImage } from '@app/classes/profile-image';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styles: [``]
})
export class ProfileImageComponent implements OnInit {
public image_object:ProfileImage=null;
public is_error:boolean=false;
public imagefile:File=null;
public want_to_update:boolean=false;

  constructor(private shareUser:ShareUserService,private userService:UserService) { }

  ngOnInit(): void {
this.userService.getProfileImage().subscribe(resp=>this.image_object=resp.body);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {

      const file:File= event.target.files[0];
      if(file.size<=1000000){//1 mb
        console.log(file.size)
      this.imagefile=file;
      this.is_error=false;
      }
      else
      this.is_error=true;
    }
      else
      this.is_error=true;
    
  }
  

  onSubmit(){
  
    if(!this.is_error && this.imagefile!=null){
      let filename=this.imagefile.name;
      console.log(filename)

      let formData:FormData=new FormData();
      formData.append('file',this.imagefile);
  this.userService.updateProfileImage(formData,filename).subscribe(resp=>
    alert("profile image successfully updated...refresh profile"),
    error=>{
      alert(error);}
    );}
    this.want_to_update=false;

  }

    updateProfileImage(){
      this.want_to_update=true;
    }
  



}
