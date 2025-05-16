import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipesMedicalesComponent } from './components/equipes-medicales/equipes-medicales.component';
import { EquipesMedicalesRoutingModule } from './equipes-medicales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListEquipesComponent } from './components/list-equipes/list-equipes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateEquipeComponent } from './components/update-equipe/update-equipe.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [EquipesMedicalesComponent,ListEquipesComponent,DeleteConfirmDialogComponent,UpdateEquipeComponent],
  imports: [
    CommonModule,
    EquipesMedicalesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
     MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    
  ]
,
  exports: [EquipesMedicalesComponent] // <-- This allows other modules to use the component
})
export class EquipesMedicalesModule { }
