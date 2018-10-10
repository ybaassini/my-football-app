import { HttpRequest, HttpResponse } from '@angular/common/http';

import { CacheItem } from './cache-item.interface';

export class HttpCacheService {
  private cache: CacheItem[] = [];
  /**
   * Returns a cached response, if any, or null if not present.
   */
  public get(req: HttpRequest<any>): HttpResponse<any>|null {
    const cacheItem = this.cache.find((item) =>
      item.req.urlWithParams === req.urlWithParams &&
      item.req.headers.get('Authorization') === req.headers.get('Authorization'));
    return cacheItem ? cacheItem.res : null;
  }

  /**
   * Adds or updates the response in the cache.
   */
  public put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    if (!this.get(req)) {
      this.cache.push({req, res});
    }
  }
}
