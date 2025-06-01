import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:1001/api/users';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(mailuser: string, passworduser: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { mailuser, passworduser });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  forgotPassword(mailuser: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { mailuser });
  }

  verifyToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-token`, { token });
  }

  resetPassword(passworduser: string): Observable<any> {
    const token = this.sessionService.getToken();
    if (!token) {
      return throwError(() => new Error('No token found in session'));
    }
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { token, passworduser });
  }

  // ✅ NEW: Verify email code
  verifyEmailCode(mailuser: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-email`, { mailuser, code });
  }
}
