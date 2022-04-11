import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.errorSubject.subscribe((errMsg) => {
      this.error = errMsg;
      console.log(this.error);
    });

    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post, formRef: NgForm) {
    this.isFetching = true;

    this.postsService
      .createAndStorePost(postData.title, postData.content)
      .subscribe((resData) => {
        // console.log(resData);
        this.fetchPosts();
      });

    formRef.reset();
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deleteAllPosts().subscribe((resData) => {
      this.fetchPosts();
      // console.log("Delete successful!", resData);
    });
  }

  private fetchPosts() {
    this.isFetching = true;

    this.postsService.fetchPosts().subscribe(
      (posts) => {
        // console.log(posts);
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (err: HttpErrorResponse) => {
        this.isFetching = false;
        // this.error = err.message;
        this.postsService.errorSubject.next(err.message);
      }
    );
  }

  onHandleError() {
    this.error = null;
  }
}
