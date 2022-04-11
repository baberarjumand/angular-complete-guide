import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subOne: Subscription;

  constructor() {}

  ngOnInit() {
    // this.subOne = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    let count = 0;
    const customIntervalObs = Observable.create((observer) => {
      setInterval(() => {
        observer.next(count++);

        if (count === 20) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"));
        }
      }, 500);
    });

    this.subOne = customIntervalObs
      .pipe(
        filter((val: number) => {
          return val % 2 === 0;
        }),
        map((val: number) => {
          return "Round: " + (val + 1);
        })
      )
      .subscribe(
        (val) => console.log(val),
        (err: Error) => {
          console.error(err);
          alert(err.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }

  ngOnDestroy(): void {
    this.subOne.unsubscribe();
  }
}
