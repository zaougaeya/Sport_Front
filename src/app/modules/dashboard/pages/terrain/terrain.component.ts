// terrain.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Terrain, TerrainCreationDTO } from '../../models/terrain.model';
import { TerrainService } from '../../services/terrain.service';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-terrain',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AlertComponent],
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss'],
})
export class TerrainComponent implements OnInit {
  terrains: Terrain[] = [];
  newTerrain: Terrain = { id: '', name: '', adresse: '', type: '' };
  showAddTerrain = false;
  errorMessage: string = '';

  editMode: { [key: string]: boolean } = {};
  editedTerrain: { [key: string]: Terrain } = {};

  message: string = '';
  alertType: 'success' | 'error' = 'success';
  constructor(private terrainService: TerrainService) { }

  ngOnInit(): void {
    this.loadTerrains();
  }

  searchTerrainTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  currentPage: number = 1;
  itemsPerPage: number = 5;

  get filteredTerrainsData() {
    let terrains = [...this.terrains];

    // Filtrage
    if (this.searchTerrainTerm) {
      const term = this.searchTerrainTerm.toLowerCase();
      terrains = terrains.filter(t =>
        t.name?.toLowerCase().includes(term) ||
        t.adresse?.toLowerCase().includes(term) ||
        t.type?.toLowerCase().includes(term)
      );
    }

    // Tri
    if (this.sortColumn) {
      terrains.sort((a, b) => {
        const key = this.sortColumn as keyof Terrain;
        const valA = (a[key] || '').toString().toLowerCase();
        const valB = (b[key] || '').toString().toLowerCase();

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return terrains;
  }

  // Affichage paginé
  get filteredTerrains() {
    const terrains = this.filteredTerrainsData;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return terrains.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTerrainsData.length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }




  // Dans ton component.ts
  sortTerrainBy(column: keyof Terrain) {
    if (this.sortColumn !== column) {
      // Premier clic sur une nouvelle colonne → tri ascendant
      this.sortColumn = column;
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      // Deuxième clic → tri descendant
      this.sortDirection = 'desc';
    } else {
      // Troisième clic → plus de tri
      this.sortColumn = '';
      this.sortDirection = 'asc';
    }
  }


  getSortIcon(column: keyof Terrain): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '⬆️' : '⬇️';
    }
    return '⇅';
  }

  // Gestion ajout
  toggleAddTerrain() {
    this.newTerrain = { id: '', name: '', adresse: '', type: '' };
    this.showAddTerrain = true;
  }

  closeAddTerrain() {
    this.showAddTerrain = false;
  }

  cancelAddTerrain() {
    this.newTerrain = { id: '', name: '', adresse: '', type: '' };
  }

  onAddTerrain() {

    if (
      !this.newTerrain.name ||
      !this.newTerrain.adresse ||
      !this.newTerrain.type
    ) {
      this.message = '❌ Tous les champs sont obligatoires.';
      this.alertType = 'error';
      setTimeout(() => {
        this.message = '';
      }, 5000);
      return;
    }
    const terrainToSend: TerrainCreationDTO = {
      name: this.newTerrain.name,
      adresse: this.newTerrain.adresse,
      type: this.newTerrain.type,
    };

    this.terrainService.createTerrain(terrainToSend).subscribe({
      next: (created) => {
        console.log("Terrain créé :", created);
        this.terrains.push(created);
        this.newTerrain = { id: '', name: '', adresse: '', type: '' };
        this.showAddTerrain = false;
        this.errorMessage = '';
        this.message = '✅ Terrain ajouté avec succès !';
        this.alertType = 'success';

        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: err => {
        this.message = '❌ Erreur lors de l’ajout du Terrain.';
        this.alertType = 'error';
        setTimeout(() => {
          this.message = '';
        }, 3000);
        console.error('Erreur ajout terrain', err);
        this.errorMessage = 'Erreur lors de l’ajout du terrain.';

        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    });
  }


  closeAlert() {
    this.message = ''; // Ferme l'alerte
  }


  // Chargement
  loadTerrains() {
    this.terrainService.getAllTerrains().subscribe({
      next: (data) => {
        this.terrains = data;
        console.log("terr", data);

        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur chargement terrains', err);
        this.errorMessage = 'Erreur lors du chargement des terrains.';
      }
    });
  }

  // Edition
  editTerrain(terrain: Terrain) {
    console.log("terrain reçu dans editTerrain", terrain); // ✅ Vérifie ici
    this.editedTerrain[terrain.id] = { ...terrain };
    this.editMode[terrain.id] = true;
  }


  saveTerrain(id: string): void {
    const updated = this.editedTerrain[id];

    // Vérification des champs obligatoires
    if (!updated.name || !updated.adresse || !updated.type) {
      this.message = '❌ Tous les champs sont obligatoires.';
      this.alertType = 'error';
      setTimeout(() => {
        this.message = '';
      }, 5000);
      return;
    }

    // Appel du service pour mettre à jour le terrain
    this.terrainService.updateTerrain(id, updated).subscribe({
      next: () => {
        this.loadTerrains(); // Recharger la liste des terrains
        this.editMode[id] = false; // Désactiver le mode d'édition
        this.message = '✅ Terrain modifié avec succès !';
        this.alertType = 'success';

        // Faire disparaître l'alerte après 3 secondes
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: (err) => {
        this.message = '❌ Erreur lors de la modification du Terrain.';
        this.alertType = 'error';
        setTimeout(() => {
          this.message = '';
        }, 3000);
        console.error('Erreur sauvegarde terrain', err);
        this.errorMessage = 'Erreur lors de la sauvegarde du terrain.';
      }
    });
  }

  cancelEdit(id: string) {
    this.editMode[id] = false;
    delete this.editedTerrain[id];
  }

  deleteMatch(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce terrain ?")) {
      this.terrainService.deleteTerrain(id).subscribe({
        next: () => {
          this.loadTerrains(); // Recharge les données après suppression
          this.message = '✅ Terrain supprimé avec succès !';
          this.alertType = 'success';

          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        error: () => {
          this.message = '❌ Erreur lors de la suppression du Terrain.';
          this.alertType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.errorMessage = "Erreur lors de la suppression du terrain.";
          console.error("Erreur de suppression !");
        }
      });
    }
  }
}