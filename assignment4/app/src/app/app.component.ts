import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  logged_in: boolean;

  constructor() { }

  ngOnInit(): void {
    this.logged_in = sessionStorage.getItem('accessToken') != null;
  }

  updateLogin(): void {
    this.logged_in = sessionStorage.getItem('accessToken') != null;
  }

  restartSession(): void {
    this.logged_in = false;
  }
}
