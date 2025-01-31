import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessData = this.authSvc.authSubject$.value;
    if (accessData) {
      const newRequest = request.clone({
        headers: request.headers.append(
          'Authorization',
          `Bearer ${accessData.accessToken}`
        ),
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
