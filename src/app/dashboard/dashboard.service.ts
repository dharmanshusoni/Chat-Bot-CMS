import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.api_Overview_URL;
const POST_OVERVIEW = 'overview';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) {
  }

  GetOverview(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(bot);
    console.log(body);
    return this.http.post(api_URL + POST_OVERVIEW , body, { 'headers': headers });
  }
}