import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInModule } from './signin/signin.module';
import {SignUpModule} from './signup/signup.module'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SignInModule,
    SignUpModule,
    SharedModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
