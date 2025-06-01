import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { NgIf, NgClass } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgClass,
    AngularSvgIconModule,
    ButtonComponent
  ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType = false;
  loginError = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this._http.post<any>('http://localhost:1001/api/users/login', { mailuser: email, passworduser: password }).subscribe({
      next: (res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this._router.navigate(['/dashboard']);
        } else {
          this.loginError = 'Invalid response from server';
        }
      },
      error: (err) => {
        this.loginError = err?.error?.message || 'Invalid email or password';
        console.error('Login failed:', err);
      }
    });
  }
}
