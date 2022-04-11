import { Component, EventEmitter, Output } from "@angular/core";
import { AccountService } from "../account.service";
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  constructor(
    // private loggingService: LoggingService,
    private accountsService: AccountService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) => {
      alert("New Status: " + status);
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus,
    // });
    this.accountsService.addAccount(accountName, accountStatus);

    // console.log("A server status changed, new status: " + accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
