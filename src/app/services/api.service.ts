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
    return headers;
  }

  getAuthToken(){
    if(localStorage.getItem('logger_token')){
      return localStorage.getItem('logger_token');
    }else {
      return null
    }
  }

  getHeartBeat(){
    return this.http.get(this.baseUrl + 'getHeartBeat',{headers:this.getHeaders()});
  }

  getUserLogin(user_email:any,user_password:any){
    return this.http.post(this.baseUrl + 'getUserLogin',{user_email:user_email,user_password:user_password})
  }

  getServices(){
    return this.http.get(this.baseUrl+'getRunningServices',{headers:this.getHeaders()});
  }

  getLogger(log:any){
    return this.http.post(this.baseUrl+'getLogger',{log},{headers:this.getHeaders()});
  }

  loggerAction(action:any,id:any){
    return this.http.post(this.baseUrl+'loggerAction',{'action':action,'id':id},{headers:this.getHeaders()}).pipe(tap(()=>{
      this._refreshNeeded.next();
    }));
  }
  

}
