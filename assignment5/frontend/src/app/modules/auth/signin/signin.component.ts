import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { SpinnerService } from 'src/app/core/services/spinner.service';

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
    private notificationService: NotificationService,
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
    this.signInForm.disable();
    this.authService.login(formData['email'], formData['password']).subscribe({
      next: (response) => {
        const resp = response
        console.log(resp);
        const decoded = jwt_decode<JwtPayload>(resp['access_token']);
        localStorage.setItem('currentUser', JSON.stringify({
          token: resp['access_token'],
          isAdmin: resp['is_admin'],
          email: resp['email'],
          id: resp['id'],
          alias: resp['email'].split("@")[0],
          expiration: Number(decoded.exp) * 1000,
          fullName: resp['fullname']
        }))
        this.router.navigate(['/app/analytics']);
      },
      error: (error) => {
        // console.log(error)
        this.notificationService.openSnackBar('wrong email and password combination');
        this.signInForm.enable();
      }
    }
    )
  }
}
