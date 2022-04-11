import { Component } from "@angular/core";
import { CounterService } from "./services/counter.service";
import { UsersService } from "./services/users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  activeUsers = this.usersService.activeUsers;
  inactiveUsers = this.usersService.inactiveUsers;
  count = 0;

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {
    this.counterService.counterUpdated.subscribe((num) => {
      // console.log(num);
      this.count = num;
    })
  }
}
