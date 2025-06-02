import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = 'http://localhost:9090/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '',
    //'Accept-Encoding' : 'gzip, deflate, br',
    //'Connection': 'Keep-Alive'
  })
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private http: HttpClient) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token as string);
    console.log('token saved');
    console.log(window.sessionStorage);
    console.log(window.sessionStorage.getItem(TOKEN_KEY));
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) as string;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('user saved');
    console.log(window.sessionStorage);
    console.log(window.sessionStorage.getItem(USER_KEY));
  }

  public getUser(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    
    return this.http.get(USER_API + 'users/me', { headers });
  }

}