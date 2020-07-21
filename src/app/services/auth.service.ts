import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject, Subject} from 'rxjs';
import {User} from '@app/classes/user';
import {LoggedInUser} from '@app/classes/logged-in-user';
//angular-json web token library
import {JwtHelperService } from '@auth0/angular-jwt';
//to read jwt-token payload
import decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { RestApiServerService } from './rest-api-server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private url:string;
  //behavior subject containing loginStatus, (expiration,is_staff and user_id)-->from token
 private subject=new BehaviorSubject<LoggedInUser>(new LoggedInUser());
  public errors: any;
 
  constructor(private http: HttpClient,private jwtHelper:JwtHelperService,private restapi:RestApiServerService) {
    this.url=restapi.path;
  }

  //returning logged in user
 public getLoggedInUser():Observable<LoggedInUser>{
    if(!this.isAuthenticated()){
      sessionStorage.clear();
      this.setLoggedInUser(new LoggedInUser());
  }
   return this.subject.asObservable();
  
}
 
//function for setting above behavior subject
private setLoggedInUser(object:LoggedInUser){
  if(object!=null){
  this.subject.next(object);

  }


  
}
//check token expiry
  private isAuthenticated():boolean {
  const token=sessionStorage.getItem('token');
  if(token==null || token==undefined){
  return false;}
  return !this.jwtHelper.isTokenExpired(token);
  }

   
   private handleError(error: HttpErrorResponse) {
     console.log("handling error.......")
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } else {
      console.error(
        `Backend returned code: ${error.status}, ` +
        `body was:${error.error.detail},`+//invalid credintials return {'global':......}
        
        `message was: ${error.message}` );
      if(error.status==400)
        return throwError("invalid crediantails....try again!!!");
        
          if(error.status==0)
          return throwError("server error....contact admin!!!");
          if(error.status==401)
        return throwError(error.error.detail);
        if(error.status==404)
        return throwError("detail not found");
}};
 
  public login(LoginUser):Observable<HttpResponse<any>>{
    if(LoginUser!=null){
    return this.http.post(this.url+'auth/login/', JSON.stringify(LoginUser),{headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
  
  catchError(this.handleError)
    );}
      
  }

 
  public logout() {
    //clearing session storage and setting default values in behavior subject
    sessionStorage.clear();
    this.setLoggedInUser(new LoggedInUser());
    
}
 
   public updateData() {
    this.errors = [];
    //don't use local storage as it is not secure
    // decode the token to read the user_id,is_staff and expiration timestamp
    const tokenPayload=decode(sessionStorage.getItem("token"));
    const is_staff:boolean=tokenPayload["is_staff"];
    const expiration=new Date(tokenPayload["exp"]*1000);
    const user_id=tokenPayload["user_id"];
    this.setLoggedInUser({"user_id":user_id,"is_staff":is_staff,"expiration":expiration,"loginStatus":true})
  }

  getUser():Observable<HttpResponse<User>>{
  return this.http.get<User>(this.url+'user/',
  {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
    catchError(this.handleError)
  )
  }
 



  
}