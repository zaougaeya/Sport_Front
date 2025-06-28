import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivreursRoutingModule } from './livreurs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivreurService } from './livreur.service';
import { LivreursComponent } from './livreurs.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LivreursRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [LivreursComponent],
  providers: [LivreurService],
})
export class LivreursModule {} 
