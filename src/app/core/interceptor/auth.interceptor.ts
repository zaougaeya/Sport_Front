// src/app/shared/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODMzMmQ1MTRkYWUyYzE5ZWUwNjJjMjUiLCJyb2xlIjoiQURNSU4iLCJqb2IiOiJFTlRSQUlORVVSIiwiaWF0IjoxNzQ4NzgwMDU0LCJleHAiOjE3NDg4NjY0NTR9._weo242BoJDPp_qEI9z2l2npf12j9NZ6pAVDHPzfxq7lzr5OvfKpAxAdOAeX_4xQ';

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
