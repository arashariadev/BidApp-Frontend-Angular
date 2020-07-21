import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError, retry,map } from 'rxjs/operators';
import { BidEventListAPI } from '@app/classes/bid-event-list-api';
import { BidEvent } from '@app/classes/bid-event';
import { RestApiServerService } from './rest-api-server.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  private url:string;

  constructor(private http:HttpClient,private restapi:RestApiServerService) {
    this.url=restapi.path+'api/events/';
    
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
    if(error.status==0){
 return throwError('server error....contact admin!!!')
    }
    if(error.status!=0){
    return throwError(
      error.error.detail);}
}};


  getEventList():Observable<HttpResponse<BidEventListAPI>>{
    return this.http.get<BidEventListAPI>(this.url,
    {headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe:'response'}).pipe(
     catchError(this.handleError));
  }

  addEventByAuctioneer(event:BidEvent):Observable<HttpResponse<any>>{

    if(event!=null){
      return this.http.post(this.url+"create/",JSON.stringify(event),
      {headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe:'response'}).pipe(
        catchError(this.handleError) );
    }
  }

  deleteEventByAdmin(event_id:number){
    if(event_id!=null){
      return this.http.delete(this.url+event_id+'/destroy/',
      {headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe:'response'}).pipe(catchError(this.handleError))
    }

  }

  

}
