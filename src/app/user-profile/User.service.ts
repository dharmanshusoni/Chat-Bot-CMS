import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_FARMER_GET = 'Farmer?userId=';
const api_BASE_USERTYPE_GET = 'GetUserType?userTypeId=';
const api_BASE_FARMER = 'Farmer/';
const api_SAVE_FARMER = 'SaveProfile/';
const api_UPDATE_FARMER = 'UpdateProfile/';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  getProfileDetail(userId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_FARMER_GET + userId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getUserType(userTypeId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_FARMER + api_BASE_USERTYPE_GET + userTypeId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveProfile(user: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(user);
    return this.http.post(api_URL + api_BASE_FARMER + api_SAVE_FARMER , body, { 'headers': headers });
  }

  UpdateProfile(user: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(user);
    return this.http.post(api_URL + api_BASE_FARMER + api_UPDATE_FARMER , body, { 'headers': headers });
  }
  
}