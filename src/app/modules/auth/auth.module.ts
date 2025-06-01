import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ProfileComponent } from '../../user/profile/profile.component';


@NgModule({
  declarations: [ProfileComponent], // ✅ declared here
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot()
  ]
})
export class AuthModule {}
