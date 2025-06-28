import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent],
})
export class AppComponent {
  title = 'SportSync';

  constructor(
    public themeService: ThemeService,
    private router: Router // Ajouter le Router dans le constructeur
  ) {}

  ngOnInit(): void {
    // Afficher la configuration des routes dans la console
    console.log(this.router.config);
  }
}
