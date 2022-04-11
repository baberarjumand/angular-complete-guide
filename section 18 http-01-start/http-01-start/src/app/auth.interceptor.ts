import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log("Req is on its way!", request.url);

    const modifiedRequest = request.clone({
      headers: request.headers.append("Auth", "xyz"),
    });

    return next.handle(modifiedRequest);
    // .pipe(
    //   tap((event) => {
    //     console.log("Interceptor Tap!", event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log("Response arrived! Body data:", event.body);
    //     }
    //   })
    // );
  }
}
