import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './category.service';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule ,  // Route spécifique à ce module
    FormsModule, // Pour la gestion des formulaires
  ],
  declarations: [CategoriesComponent],
  providers: [CategoryService],
})

export class CategoriesModule {}
