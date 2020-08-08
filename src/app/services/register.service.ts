import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestApiServerService } from './rest-api-server.service';
import { NewUser } from '@app/classes/new-user';
import { SpinnerService } from './spinner.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
//url string
  private url:string;

  constructor(private http:HttpClient,private restapi:RestApiServerService,private spinner:SpinnerService) {
    this.url=restapi.path+'user/create/';
   }
//handle error
   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.detail}, `+
        `message was: ${error.message}` );
    
    // return an observable with a user-facing error message
    if(error.status==0)
    return throwError("could not connect to server.Check your internet connection!!!");
    else
    return throwError(error.error.detail);

}};


  registerUser(user:NewUser):Observable<HttpResponse<NewUser>>{
    
    this.spinner.add();

    return this.http.post<NewUser>(this.url,JSON.stringify(user),
    {headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe:'response'}).pipe(
     catchError(this.handleError));
  }
  
}
