import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestApiServerService } from '@app/services/rest-api-server.service';
import { NewUser } from '@app/classes/new-user';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  

  private url:string;

  constructor(private http:HttpClient,private restapi:RestApiServerService) {
    this.url=restapi.path+'user/create/';
   }



   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) 
    {
     
      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } 
    else 
    {
      
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.detail}, `+
        `message was: ${error.message}` );
    
        if(error.status==0)
          return throwError("could not connect to server.Check your internet connection!!!");
        
        else
          return throwError(error.error.detail);

}};



  registerUser(user:NewUser):Observable<HttpResponse<NewUser>>{

    return this.http.post<NewUser>(this.url,JSON.stringify(user),
    {headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe:'response'}).pipe(
     catchError(this.handleError));
  }
  
}
