import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';
@Injectable()
//to send Json web token with each request in headers...if present.
//Note:null value is not send
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=sessionStorage.getItem("token")
    if(token!=undefined||token!=null){
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    });}
    return next.handle(request);
  }
}