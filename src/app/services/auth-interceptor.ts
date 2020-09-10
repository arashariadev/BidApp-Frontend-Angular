import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '@app/services/spinner.service';

@Injectable()
/* to send Json web token with each request in headers...if present. */


export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   
        const token=localStorage.getItem("token");

        if(token!=undefined||token!=null){
      
            request = request.clone({
            setHeaders: {
            Authorization: `Bearer ${token}`
        }
        
    });}

    return next.handle(request);
  }
}