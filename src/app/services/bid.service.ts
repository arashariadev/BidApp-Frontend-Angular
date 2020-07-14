import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Bid } from '@app/classes/bid';
import { catchError } from 'rxjs/operators';
import { RetrieveBid } from '@app/classes/retrieve-bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private url:string="http://127.0.0.1:8000/api/events/"

  constructor(private http:HttpClient) { }

  retrieveHighestBid(event_id:number):Observable<HttpResponse<RetrieveBid>>{
  
    return this.http.get<RetrieveBid>(this.url+event_id+'/highest_bid/',
    {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(catchError(this.handleError))
  }

  place_bid(bid:Bid,event_id:number):Observable<HttpResponse<any>>{
    if(bid!=null && event_id!=null){
    return this.http.post<any>(this.url+event_id+'/bids/create/',JSON.stringify(bid),
    {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'}).pipe(
      catchError(this.handleError)
    );
    }
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
       `body was:${error.error.detail},`+
       
       `message was: ${error.message}` );
         if(error.status==0)
         return throwError("server error....contact admin!!!");
       else
       return throwError(error.error.detail);
}};
}
