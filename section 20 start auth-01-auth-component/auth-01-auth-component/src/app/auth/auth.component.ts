import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onClose() {
    this.errorMessage = null;
  }

  onSubmit(authForm: NgForm) {
    // console.log(authForm.value);
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (!this.isLoginMode) {
      authObs = this.auth.signUpNewUser(
        authForm.value.email,
        authForm.value.password
      );
    } else {
      authObs = this.auth.signIn(authForm.value.email, authForm.value.password);
    }

    authObs.subscribe(
      (resData) => {
        // console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errRes) => {
        // console.error(err);
        // this.errorMessage = 'An error occured'
        this.errorMessage = errRes;
        this.isLoading = false;
        this.showErrorAlert(errRes);
      }
    );

    authForm.reset();
  }

  private showErrorAlert(errMsg: string) {
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);

    componentRef.instance.message = errMsg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
