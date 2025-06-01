import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgIf,
    NgClass
  ]
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  signupError = '';

  sexes = ['Homme', 'Femme', 'Autre'];
  jobs = ['JOUEUR', 'ENTRAINEUR', 'EQUIPE_MEDICAL', 'FOURNISSEUR'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(10)]],
      sexe: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    console.log("🚀 Submitting form with values:", this.form.value);

    const payload = {
      prenomuser: this.form.value.firstname,
      nomuser: this.form.value.lastname,
      mailuser: this.form.value.email,
      passworduser: this.form.value.password,
      ageuser: this.form.value.age,
      sexeuser: this.form.value.sexe,
      job: this.form.value.job
    };

    this.http.post<any>('http://localhost:1001/api/users/register', payload).subscribe({
  next: (res) => {
    console.log("✅ Full server response:", res);

    // Try both variations
    const message = res?.message || res?.body?.message;
    if (message && message.includes("verification code")) {
      localStorage.setItem('pendingEmail', this.form.value.email);
      alert("✅ Redirecting now...");
      this.router.navigate(['/auth/two-steps']);
   
    } else {
      this.signupError = 'Unexpected server response.';
    }
  },
  error: (err) => {
    console.error("❌ Registration error:", err);
    this.signupError = err?.error?.error || 'Registration failed.';
  }
});
  }}