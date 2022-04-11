import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  numList: number[] = [];

  onNumberEmit(emittedNum: number) {
    // console.log(emittedNum);
    this.numList.push(emittedNum);
  }
}
