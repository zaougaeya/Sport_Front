import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipesMedicalesComponent } from './components/equipes-medicales/equipes-medicales.component';
import { EquipesMedicalesRoutingModule } from './equipes-medicales-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListEquipesComponent } from './components/list-equipes/list-equipes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateEquipeComponent } from './components/update-equipe/update-equipe.component';

@NgModule({
  declarations: [EquipesMedicalesComponent,ListEquipesComponent,DeleteConfirmDialogComponent,UpdateEquipeComponent],
  imports: [
    CommonModule,
    EquipesMedicalesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    
  ]
})
export class EquipesMedicalesModule { }
