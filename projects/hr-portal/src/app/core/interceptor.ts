import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';


@Injectable()
export class Interceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}
  public intercept (req: HttpRequest<any>,
                    next: HttpHandler):
        Observable<HttpEvent<any>> {
        
         
      req = req.clone({
        setHeaders: {
        Authorization: `${this.authService.getAuthorizationHeaderValue()}`
        }
        });
      return next.handle(req);
    }

}
