import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { ApiHandlerService } from '../../services';
import { HttpResponseBase } from '@angular/common/http/src/response';

export class ApiInterceptor implements HttpInterceptor {
  constructor(private apiHandlerService: ApiHandlerService) { }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.apiHandlerService.callsPending.next(true);
    return next.handle(req)
      .pipe(
      tap((res: HttpEvent<any>) => {
        if (res instanceof HttpResponse) {
          this.apiHandlerService.registerResponse(req, res);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.apiHandlerService.registerResponse(req, err);
        }
      }),
      finalize(() => {
        this.apiHandlerService.callsPending.next(false);
      })
      );
  }
}
