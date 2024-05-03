import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers:HttpHeaders = new HttpHeaders()
  public baseUrl:string = 'http://localhost:1777/api/';
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

  getServerInfo(id:any){
    if(id){
      return this.http.get(this.baseUrl + `getServerInfo?id=${id}`,{headers:this.getHeaders()});
    } else {
      return this.http.get(this.baseUrl + 'getServerInfo',{headers:this.getHeaders()});
    }
  }
  
  saveServerInfo(serverInfo:any){
    return this.http.post(this.baseUrl + 'serverInfo',{serverInfo},{headers:this.getHeaders()}).pipe(tap(()=>{
      this._refreshNeeded.next();
    }));
  }

  getServices(baseUrl:any){
    return this.http.get(baseUrl+'getRunningServices',{headers:this.getHeaders()});
  }

  getLogger(baseUrl:any,log:any){
    return this.http.post(baseUrl+'getLogger',{log},{headers:this.getHeaders()});
  }

  loggerAction(baseUrl:any,action:any,id:any){
    return this.http.post(baseUrl+'loggerAction',{'action':action,'id':id},{headers:this.getHeaders()}).pipe(tap(()=>{
      this._refreshNeeded.next();
    }));
  }
  
  executeCommands(baseUrl:any,command:any){
    return this.http.post(baseUrl+'executeCommands',{command:command},{headers:this.getHeaders()})
  }

}
