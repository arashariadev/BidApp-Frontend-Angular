import { Profile } from './profile';

export class User {
                
                public username:string;
                public first_name:string;
                public last_name:string;
                public email:string;
                public profile:Profile;
    constructor(
                profile:Profile,
                username:string=null,
                first_name:string=null,
                last_name:string=null,
                email:string=null,
                 ){

                    this.username=username;
                    this.first_name=first_name;
                    this.last_name=last_name;
                    this.email=email;
                    this.profile=profile;
                 }

              
}
