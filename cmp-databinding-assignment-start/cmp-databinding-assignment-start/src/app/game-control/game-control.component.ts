import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  intervalId: NodeJS.Timeout;

  @Output() numberEmitted = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onStart() {
    this.intervalId = setInterval(() => {
      this.numberEmitted.emit(Math.floor(Math.random() * 100));
    }, 1000);
  }

  onStop() {
    clearInterval(this.intervalId);
  }
}
