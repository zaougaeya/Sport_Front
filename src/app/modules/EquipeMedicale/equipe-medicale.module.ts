import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEquipeComponent } from './components/add-equipe/add-equipe.component';
import { EquipeMedicaleRoutingModule } from './equipe-medicale-routing.module';
import { FormsModule } from '@angular/forms'; // If you use template forms
import { ReactiveFormsModule } from '@angular/forms'; // If you use reactive forms

@NgModule({
  declarations: [AddEquipeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EquipeMedicaleRoutingModule
  ]
})
export class EquipeMedicaleModule {}
