import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipeMedicale } from '../../models/equipes-medicales.model';
import { EquipesMedicalesService } from '../../services/equipes-medicales.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-equipes',
  templateUrl: './list-equipes.component.html',
  styleUrls: ['./list-equipes.component.scss']
})
export class ListEquipesComponent implements OnInit {
 equipes: EquipeMedicale[] = [];
  filteredEquipes: EquipeMedicale[] = [];
  paginatedEquipes: EquipeMedicale[] = [];
  searchText: string = '';
  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipesService: EquipesMedicalesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEquipes();
  }

  getEquipes(): void {
    this.equipesService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
        this.filteredEquipes = data;
        this.updatePaginatedEquipes();
      },
      error: (err) => {
        console.error('Error fetching equipes:', err);
      }
    });
  }

  filterEquipes(): void {
    const text = this.searchText.toLowerCase();
    this.filteredEquipes = this.equipes.filter(equipe =>
      equipe.nomEquipeMedicale?.toLowerCase().includes(text)
    );
    this.currentPage = 0;
    this.updatePaginatedEquipes();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEquipes();
  }

  updatePaginatedEquipes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEquipes = this.filteredEquipes.slice(startIndex, endIndex);
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
      next: () => this.getEquipes(),
      error: (err) => console.error('Error deleting equipe:', err)
    });
  }
}