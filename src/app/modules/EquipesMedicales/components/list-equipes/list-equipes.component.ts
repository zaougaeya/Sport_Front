import { Component, OnInit } from '@angular/core';
import { EquipeMedicale } from '../../models/equipes-medicales.model';
import { EquipesMedicalesService } from '../../services/equipes-medicales.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-equipes',
  
  templateUrl: './list-equipes.component.html',
  styleUrl: './list-equipes.component.scss'
})
export class ListEquipesComponent implements OnInit{

 equipes: EquipeMedicale[] = [];

  constructor(
    private equipesService: EquipesMedicalesService,
    public dialog: MatDialog // Inject the Dialog service
  ) { }

  ngOnInit(): void {
    this.getEquipes();
  }

  getEquipes(): void {
    this.equipesService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
      },
      error: (err) => {
        console.error('Error fetching equipes:', err);
      }
    });
  }

 openDeleteConfirmDialog(equipeId?: string): void {
  if (!equipeId) {
    console.error('Equipe ID is undefined');
    return;
  }

  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    width: '300px',
    data: { equipeId },
    disableClose: true,
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm') {
      this.deleteEquipe(equipeId);
    }
  });
}
  deleteEquipe(equipeId: string): void {
    this.equipesService.deleteEquipe(equipeId).subscribe({
      next: () => {
        this.getEquipes(); // Refresh list after delete
      },
      error: (err) => {
        console.error('Error deleting equipe:', err);
      }
    });
  }

}