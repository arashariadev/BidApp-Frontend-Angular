import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {User} from '@app/classes/user';

//to read jwt-token payload
import decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { RestApiServerService } from '@app/services/rest-api-server.service';
import { SpinnerService } from '@app/services/spinner.service';
import { ShareUserService } from './share-user.service';
import { Profile } from '@app/classes/profile';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  private url:string;
  
/* this behavior subject keeps track if user is logged in or not based on whether 
    token  is present in localStorage */
 
  private loginStatus=new BehaviorSubject<Boolean>(AuthService.hasToken());

 
  constructor(private http: HttpClient,private restapi:RestApiServerService,private spinner:SpinnerService,
    private shareUser:ShareUserService) {
    this.url=restapi.path;
  }

  /* this method checks only if token is present (no validation) */
  /* token verification in django is robust enough to handle any problem */
  /* data is always safe */
public static hasToken(){

  const token=localStorage.getItem('token');
  if(token==null || token==undefined){
  return false;}

  return true;

}

/* these methods set values for above loginStatus */
  getLoginStatus():Observable<Boolean>{

    return this.loginStatus.asObservable();
  }

  setLoginStatus(loginStatus:Boolean){
    this.loginStatus.next(loginStatus);
  }
   

   private handleError(error: HttpErrorResponse) {
     
    if (error.error instanceof ErrorEvent) {
      /* A client-side or network error occurred. */

      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } else {
      console.error(
        `Backend returned code: ${error.status}, ` +
        `body was:${error.error.detail},`+//invalid credintials return {'detail':......}
        
        `message was: ${error.message}` );
        
          if(error.status==0)
          return throwError("could not connect to server.Check your internet connection!!!");
          
        return throwError(error.error.detail);
}};
 

/* this request on successfull completion returns a token */
  public login(LoginUser):Observable<HttpResponse<any>>{
    this.spinner.add();
    if(LoginUser!=null){
    return this.http.post(this.url+'auth/login/', JSON.stringify(LoginUser),{headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
  
  catchError(this.handleError)
    );}
      
  }

 
  /* here,we clear out local storage and set value for loginStatus */
  public logout() {

    localStorage.clear();
    this.setLoginStatus(false);
    this.shareUser.setLoggedInUser(new User(new Profile()));
    
}
 
/* this method decodes token and reads foll. properties:'is_staff (admin) and 'exp' (expire time of token) */
   public updateData() {

    
    const tokenPayload=decode(localStorage.getItem("token"));
    const is_staff:Boolean=tokenPayload["is_staff"];
    const expiration=new Date(tokenPayload["exp"]*1000);
    
    localStorage.setItem('exp',JSON.stringify(expiration));
    localStorage.setItem('is_staff',JSON.stringify(is_staff));//access admin comp.

    this.setLoginStatus(true);
  }


  /* get user from server:token is added in header by auth-interceptor before this requests processes */

  getUser():Observable<HttpResponse<User>>{
    this.spinner.add();

  return this.http.get<User>(this.url+'user/',
  {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
    catchError(this.handleError)
  )
  }
 



  
}