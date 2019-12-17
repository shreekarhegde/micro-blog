import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "../services/http.service";
const AUTHENTICATION_URL: string = "authentication";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  pwdErrorMsg: string = "";
  emailErrorMsg: string = "";
  submitting: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
    this.form = this.formBuilder.group(
      {
        email: [
          "",
          {
            validators: [Validators.required]
          }
        ],
        password: [
          "",
          {
            validators: [Validators.required]
          }
        ]
      },
      {
        updateOn: "blur"
      }
    );
  }

  ngOnInit() {}

  validateForm(): boolean {
    let hasError = false;
    if (this.form.get("email").invalid) {
      hasError = true;
      this.emailErrorMsg = "This field is required.";
    }
    if (this.form.get("password").invalid) {
      hasError = true;
      this.pwdErrorMsg = "This field is required.";
    }
    return hasError;
  }

   onSubmit(formData: FormGroup) {
    console.log("formData: onSubmit", formData);
    let hasError = this.validateForm();
    console.log("hasError: onSubmit", hasError);
    console.log('onSubmit: pwdErrorMsg', this.pwdErrorMsg);
    if (hasError) {
      return;
    }
    let loginFormData = {
      strategy: "local",
      ...formData
    };
    console.log("loginFormData", loginFormData);
    this.httpService.post(AUTHENTICATION_URL, loginFormData).subscribe(
      res => {
        console.log("onSubmit: authenticatoin response", res);
      },
      error => {
        console.log("onSubmit: authentication error", error);
      }
    );
  }

  clearErrors(filed: string){
    switch(filed){
      case 'password':
        this.pwdErrorMsg = '';
        break;
      case 'email':
        this.emailErrorMsg = '';
        break;
    }
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
}
