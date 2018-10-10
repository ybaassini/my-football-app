import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheService } from './http-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private blacklist: string[] = ['/quote', '/uploaded_document', '/order'];

  constructor(private cache: HttpCacheService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Do not cache quote responses (need updated data after save quote)
    if (this.blacklist.map((item) => req.url.indexOf(item) < 0).reduce((a, b) => a && b)) {
      // First, check the cache to see if this request exists.
      const cachedResponse = this.cache.get(req);
      if (cachedResponse) {
        // A cached response exists. Serve it instead of forwarding
        // the request to the next handler.
        return of(cachedResponse);
      }
    }

    // No cached response exists. Go to the network, and cache
    // the response when it arrives.
    return next.handle(req)
      .pipe(
        tap((event) => {
          // Remember, there may be other events besides just the response.
          if (event instanceof HttpResponse) {
            // Update the cache.
            this.cache.put(req, event);
          }
        })
      );
  }
}
