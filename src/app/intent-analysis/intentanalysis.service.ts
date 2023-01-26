import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const POST_INTENT = 'top_intent';
const POST_EXIT_INTENT = 'exit_intent';
const POST_EXIT_PERCENT = 'exit_percent';
const POST_SENTIMENT = 'sentiment';
const POST_FALLBACK_DATA = "fallback_data"

@Injectable({
  providedIn: 'root'
})

export class IntentAnalysisService {

  constructor(private http: HttpClient) {
  }

  GetTopIntent(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.post(api_URL + POST_INTENT , bot, { 'headers': headers });
  }

  GetExitIntent(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.post(api_URL + POST_EXIT_INTENT , bot, { 'headers': headers });
  }

  GetExitIntentPercent(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.post(api_URL + POST_EXIT_PERCENT , bot, { 'headers': headers });
  }

  GetSentiment(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.post(api_URL + POST_SENTIMENT , bot, { 'headers': headers });
  }

  GetFallbackData(bot: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.post(api_URL + POST_FALLBACK_DATA , bot, { 'headers': headers });
  }

}