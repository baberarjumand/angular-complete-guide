import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggingService {
  lastLog: string;

  constructor() {}

  printLog(message: string) {
    console.log("newLog:", message);
    console.log("oldLog:", this.lastLog);
    this.lastLog = message;
  }
}
