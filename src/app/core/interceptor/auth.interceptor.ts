import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don't add token for register/login/verify endpoints
    if (
      req.url.includes('/register') ||
      req.url.includes('/login') ||
      req.url.includes('/verify') ||
      req.url.includes('/forgot-password') ||
      req.url.includes('/reset-password')
    ) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
