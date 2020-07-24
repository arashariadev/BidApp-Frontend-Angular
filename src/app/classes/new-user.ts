import { Profile } from './profile';

export class NewUser {
      
    public username:string;
    public first_name:string;
    public password:string;
    public last_name:string;
    public email:string;
    public profile:Profile;
    public confirm_password?:string;
constructor(
    profile:Profile,
    username:string=null,
    first_name:string=null,
    password:string=null,
    last_name:string=null,
    email:string=null,
    confirm_password?:string
     ){

        this.username=username;
        this.first_name=first_name;
        this.password=password;
        this.last_name=last_name;
        this.email=email;
        this.profile=profile;
        this.confirm_password=confirm_password;
     }

}
