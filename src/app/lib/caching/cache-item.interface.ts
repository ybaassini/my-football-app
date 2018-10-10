import { HttpRequest, HttpResponse } from '@angular/common/http';

export interface CacheItem {
  req: HttpRequest<any>;
  res: HttpResponse<any>;
}
