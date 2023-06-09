import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../../Shared/Models/Job";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  getAllJobs(): Observable<Job[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', '6128a1f23062476c8395e674976d5513');
    return this.http.get<Job[]>("https://antra2023apigateway.azure-api.net/recruting/api/Jobs", {
      headers: {'Ocp-Apim-Subscription-Key': '6128a1f23062476c8395e674976d5513'}
    });
  }
}
