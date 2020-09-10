//represents current logged in user-->expiration,user_id and is_staff are present in JSON web token payload
export class LoggedInUser {
        
        public user_id:number=null;
        public is_staff:boolean=false;
        public expiration:Date=null;
        public loginStatus:boolean=false;
    
    
        
    }
      


