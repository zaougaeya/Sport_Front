import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LivreursComponent } from './pages/livreurs/livreurs.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CommandesComponent } from './pages/commandes/commandes.component';


@NgModule({
  declarations: [
    LivreursComponent,
   CategoriesComponent,
   ProduitsComponent,
   CommandesComponent
  ],
  imports: [DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class DashboardModule {}
