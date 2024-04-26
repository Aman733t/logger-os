import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers:HttpHeaders = new HttpHeaders()
  public baseUrl:string = 'http://localhost:1337/api/';
  private _refreshNeeded = new Subject<void>();

  constructor(private http:HttpClient) { }

  refreshNeeded() {
    return this._refreshNeeded;
  }

  getHeaders(){
    let headers:HttpHeaders = new HttpHeaders();
    headers = headers.append('authorization','magic '+this.getAuthToken());
    headers = headers.append('sf-account-id',' '+this.getAccountId());    
    return headers;
  }

  getAuthToken(){
    if(localStorage.getItem('sf_token')){
      return localStorage.getItem('sf_token');
    }else {
      return null
    }
  }

  getAccountId(){
    if(localStorage.getItem('sf_account_id')){
      return localStorage.getItem('sf_account_id');
    }else {
      return null
    }
  }

  getServices(){
    return this.http.get(this.baseUrl+'getRunningServices');
  }

  getLogger(log:any){
    return this.http.post(this.baseUrl+'getLogger',{log});
  }

}
