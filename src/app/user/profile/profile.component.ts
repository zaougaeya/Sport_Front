import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('userInfo');
    this.user = stored ? JSON.parse(stored) : null;
    if (!this.user) {
      this.router.navigate(['/auth/sign-in']);
    }
  }
}

