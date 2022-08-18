import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './angular-material.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AngularMaterialModule.forRoot(),
    LoggerModule.forRoot({
      serverLoggingUrl: `http://localhost:68552/`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
