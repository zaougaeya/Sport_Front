import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProduitService } from './produit.service';
import { HttpClientModule } from '@angular/common/http';
import { ProduitsComponent } from './produits.component';
import { ProduitsRoutingModule } from './produits-routing.module';
import { CategoryService } from '../categories/category.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProduitsRoutingModule ,
    ReactiveFormsModule  ,
  ],
  declarations: [ProduitsComponent],
  providers: [ProduitService,CategoryService]
})
export class ProduitsModule {}
