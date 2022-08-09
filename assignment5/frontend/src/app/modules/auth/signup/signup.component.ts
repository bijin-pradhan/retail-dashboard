import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signInForm!: FormGroup;
  showAlert: boolean = false;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['hughes.brian@company.com', [Validators.required, Validators.email]],
      password: ['admin', Validators.required],
      rememberMe: ['']
    });
  }

  openAlert() { }

  togglePasswordVisibility() { }

  signIn() { }

}
