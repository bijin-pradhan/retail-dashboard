import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  showAlert: boolean = false;
  constructor(private _formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
  }

  openAlert() { }

  togglePasswordVisibility() { }

  signIn() {
    const formData = this.signInForm.getRawValue();
    this.authService.login(formData['email'], formData['password'])
    if (localStorage.getItem("currentUser")) {
      this.router.navigate(['/app/analytics'])
    }
  }
}
