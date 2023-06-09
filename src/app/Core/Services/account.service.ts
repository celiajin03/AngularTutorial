import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Job} from "../../Shared/Models/Job";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Register} from "../../Shared/Models/Register";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  Register(registerData:Register): Observable<boolean> {
    return this.http.post<boolean>("https://antra2023apigateway.azure-api.net/recruting/api/Account/Login", registerData, {
      headers: {'Ocp-Apim-Subscription-Key': environment.subscriptionKey}
    });
  }
}
