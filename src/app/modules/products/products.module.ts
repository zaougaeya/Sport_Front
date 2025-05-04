import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
  imports: [
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
})
export class ProductModule {}
