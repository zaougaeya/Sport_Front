import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Login a user
  login(mailuser: string, passworduser: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { mailuser, passworduser });
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Update user
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Forgot password
  forgotPassword(mailuser: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { mailuser });
  }

  // Verify token
  verifyToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-token`, { token });
  }

  // Reset password
  resetPassword(passworduser: string): Observable<any> {
    const token = this.sessionService.getToken();
    if (!token) {
      return throwError(() => new Error('No token found in session'));
    }

    return this.http.post<any>(`${this.apiUrl}/reset-password`, { token, passworduser });
  }
}
