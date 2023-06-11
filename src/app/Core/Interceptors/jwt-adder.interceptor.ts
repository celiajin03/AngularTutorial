import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccountService} from "../Services/account.service";

@Injectable()
export class JwtAdderInterceptor implements HttpInterceptor {

  loggedIn: boolean = false;
  jwtToken: string = "";
  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.isLoggedIn.subscribe(data => this.loggedIn = data);
    if(this.loggedIn) {
      this.jwtToken = localStorage.getItem('token')!;
      if(this.jwtToken!=null){
        return next.handle(request.clone({setHeaders: {Authorization: `Bearer ${this.jwtToken}`}}));
      }
    }
    return next.handle(request);
  }
}
