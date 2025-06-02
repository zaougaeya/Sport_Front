import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:7071/api/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Accept-Encoding' : 'gzip, deflate, br',
    //'Connection': 'Keep-Alive'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

 


getAllUsers(): Observable<any> {
  return this.http.get(AUTH_API, httpOptions);
}

}
