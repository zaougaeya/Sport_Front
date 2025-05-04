import { Injectable } from '@angular/core';
import {jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private token: string | null = null;

  setUserToken(token: string): void {
    this.token = token;
    localStorage.setItem('userToken', token); // Optional: Save to local storage
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('userToken');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id || null;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  clearSession(): void {
    console.log("session");
    this.token = null;
    localStorage.removeItem('userToken');
  }
}
