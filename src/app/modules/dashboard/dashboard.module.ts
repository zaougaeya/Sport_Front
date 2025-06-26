import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LivreursComponent } from './pages/livreurs/livreurs.component';
import { ProduitsComponent } from './pages/produits/produits.component';

// ✅ Import des composants standalone
import { CategoriesComponent } from './pages/categories/categories.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { StatVComponent } from './pages/stat-v/stat-v.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Import Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LivreursComponent,
    ProduitsComponent,
    // ❌ Ne PAS déclarer les standalone components ici
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    // ✅ Ajouter les composants standalone ici
    CategoriesComponent,
    CommandesComponent,
    StatVComponent
  ]
})
export class DashboardModule {}
