import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const POST_SESSION_TABLE = 'session_analysis';

@Injectable({
  providedIn: 'root'
})

export class SessionAnalysisService {

  constructor(private http: HttpClient) {
  }

  GetSessionAnalysis(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.post(api_URL + POST_SESSION_TABLE , bot, { 'headers': headers });
  }
}