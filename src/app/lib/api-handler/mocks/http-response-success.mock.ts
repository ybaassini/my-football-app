import { HttpResponse } from '@angular/common/http';

export const apiResponseSuccessMock: HttpResponse<any> = new HttpResponse({
  body: {},
  status: 200,
  url: 'http://localhost:4200/api/sessions'
});
