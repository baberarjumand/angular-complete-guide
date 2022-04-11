import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  sampleForm: FormGroup;
  statuses = ["stable", "critical", "finished"];

  constructor() {}

  ngOnInit(): void {
    this.sampleForm = new FormGroup({
      name: new FormControl(null, [Validators.required], [this.forbiddenProjectNameValidator]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl("stable", [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.sampleForm.value);
  }

  forbiddenProjectNameValidator(
    control: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
}
