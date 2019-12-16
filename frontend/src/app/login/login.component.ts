import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "../services/http.service";
const strongRegex =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,})";
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
            validators: [Validators.required, Validators.minLength(2)]
          }
        ],
        password: [
          "",
          {
            validators: [
              Validators.required,
              Validators.pattern(new RegExp(strongRegex))
            ]
          }
        ]
      },
      {
        updateOn: "blur"
      }
    );
  }

  ngOnInit() {
    console.log(this.form.get("email"));
    console.log(this.form.get("password"));
    this.validateForm();
  }

  async validateForm(): Promise<boolean> {
    let hasError = false;
    console.log(this.form.get("password").errors);
    await this.form.get("password").valueChanges.subscribe(value => {
      console.log("ngOnInit: value", value);
      if (
        this.form.get("password").errors &&
        this.form.get("password").errors.pattern
      ) {
        hasError = true;
        this.pwdErrorMsg =
          "Password must contain a Small case, an Upper case, a Number and a Special character.";
      }
      if (!value.length) {
        hasError = true;
        this.pwdErrorMsg = "This filed is required!";
      }
    });
    return hasError;
  }

  async onSubmit(formData: FormGroup) {
    console.log("formData: onSubmit", formData);
    let hasError = await this.validateForm();
    console.log("hasError: onSubmit", hasError);
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

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
}
