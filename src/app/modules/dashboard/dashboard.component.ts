import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,], // permet de charger les routes enfants
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
