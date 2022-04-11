import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("formRef") sampleForm: NgForm;
  defaultSubOption = "advanced";

  onSubmit() {
    console.log(this.sampleForm);
    console.log(this.sampleForm.value);
  }
}
