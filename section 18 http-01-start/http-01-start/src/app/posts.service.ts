import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  baseUrl =
    "https://angular-academind-udemy-default-rtdb.europe-west1.firebasedatabase.app";
  errorSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    return this.http.post<{ name: string }>(
      this.baseUrl + "/posts.json",
      {
        title,
        content,
      },
      {
        observe: "response",
      }
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");

    return this.http
      .get<{ [key: string]: Post }>(this.baseUrl + "/posts.json", {
        headers: new HttpHeaders({
          "Custom-Header": "Hello",
        }),
        params: searchParams,
      })
      .pipe(
        map((resData) => {
          const postsArr: Post[] = [];

          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              postsArr.push({ ...resData[key], id: key });
            }
          }

          return postsArr;
        }),
        catchError((errorRes) => {
          // send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deleteAllPosts() {
    return this.http
      .delete(this.baseUrl + "/posts.json", {
        observe: "events",
        responseType: "text",
      })
      .pipe(
        tap((event) => {
          console.log(event);

          if (event.type === HttpEventType.Sent) {
            console.log(event.type);
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
