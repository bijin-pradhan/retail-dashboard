import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
  }

  errorMessage: string = '';
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  handleResponse(response: object): void {
    sessionStorage.setItem('accessToken', response["access_token"]);
    sessionStorage.setItem('refreshToken', response['refresh_token']);
    this.loginEvent.emit(true);
  }

  handleError(error: object) {
    this.errorMessage = error['error']['error'];
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = "Both username and password are required."
    }
    else {
      var formData = JSON.stringify(this.loginForm.getRawValue())

      this.http.post(
        "http://127.0.0.1:5000/login", formData, this.httpOptions
      ).subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error),
      });
    }
  }
}
