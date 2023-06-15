import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Job} from "../../Shared/Models/Job";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Register} from "../../Shared/Models/Register";
import {Login} from "../../Shared/Models/Login";
import {environment} from "../../../environments/environment";
import {User, UserWAdmin} from "../../Shared/Models/User";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject = new BehaviorSubject<UserWAdmin>({} as UserWAdmin);
  public currentUser = this.currentUserSubject.asObservable();

  private islLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.islLoggedInSubject.asObservable();

  jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  Register(registerData:Register): Observable<boolean> {
    return this.http.post<boolean>("https://antra2023apigateway.azure-api.net/authentication/api/Account/register", registerData, {
      headers: {'Ocp-Apim-Subscription-Key': environment.subscriptionKey}
    });
  }

  Login(loginData:Login):Observable<boolean> {
    return this.http.post<boolean>("https://antra2023apigateway.azure-api.net/authentication/api/Account/login", loginData, {
      headers: {'Ocp-Apim-Subscription-Key': environment.subscriptionKey}
    }).pipe(map((response:any)=>{
      if(response) {
        localStorage.setItem('token', response.token);
        this.populateUserInfoFromToken();
        return true;
      }
      else {
        return false;
      }
    }));
  }

  Logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next({} as UserWAdmin);
    this.islLoggedInSubject.next(false);
  }

  populateUserInfoFromToken() {
    var tokenValue = localStorage.getItem('token');

    if (tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)) {
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.islLoggedInSubject.next(true);
      const newUser: UserWAdmin =  {
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        password: decodedToken.password,
        isAdmin: decodedToken.isAdmin
      };
      this.currentUserSubject.next(newUser);
    }
  }

  ValidateJWTToken(){
    var tokenValue = localStorage.getItem('token');

    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)) {
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.populateUserInfoFromToken();
    }
  }
}
