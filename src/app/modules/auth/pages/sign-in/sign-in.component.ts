import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/modules/dashboard/services/auth.service';
import { TokenStorageService } from 'src/app/modules/dashboard/services/token-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService

  ) { }

  onClick() {
    console.log('Button clicked');
  }

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
    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("form invalid");
      return;
    }

    if (this.form.valid) {
      // Implement your login logic here
      console.log(this.form.value);
      this.authService.login(this.form.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          console.log(data.token);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;

          // 🔽 Appel de getUser après authentification
          this.tokenStorage.getUser(data.token).subscribe(
            user => {
              console.log(user);
              this.tokenStorage.saveUser(user); // mettre à jour avec les vraies données de l’API
              this.roles = user.roles;
              console.log("User from API:", user);

              /*if (this.roles.includes('ROLE_CLIENT')) {
                this.router.navigateByUrl('/creditForm');
              } else {
                this.router.navigateByUrl('/consultation');
              }*/
            },
            err => {
              console.error("Error retrieving user:", err);
            }
          );
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );

    }

    //this._router.navigate(['/']);
  }
}
