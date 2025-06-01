import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-two-steps',
  standalone: true,
  templateUrl: './two-steps.component.html',
  styleUrls: ['./two-steps.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass
  ]
})
export class TwoStepsComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      code: ['', Validators.required]
    });
  }

 onSubmit(): void {
  const email = localStorage.getItem('pendingEmail');

  if (!email) {
    this.errorMessage = 'Missing email. Please sign up again.';
    return;
  }

  const code = this.form.value.code;

  this.http.post('http://localhost:1001/api/users/verify-code', null, {
    params: {
      email: email,
      code: code
    },
    observe: 'response'
  }).subscribe({
    next: (res) => {
      console.log("✅ Verification successful:", res.body);
      localStorage.removeItem('pendingEmail');
      // 👇 Redirect to the full absolute path (external route)
      window.location.href = 'http://localhost:4200/auth/sign-in';
    },
    error: (err) => {
      console.error("❌ Verification failed:", err.error);
      this.errorMessage = err.error || 'Invalid or expired code. Please try again.';
    }
  });
}
}