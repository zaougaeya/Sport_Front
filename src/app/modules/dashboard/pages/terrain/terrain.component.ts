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


  saveTerrain(id: string) {
    const updated = this.editedTerrain[id];
    this.terrainService.updateTerrain(id, updated).subscribe({
      next: () => {
        this.loadTerrains();
        this.editMode[id] = false;
        this.editedTerrain[id];
        this.message = '✅ Terrain modifié avec succès !';
        this.alertType = 'success';

        // ➤ Faire disparaître l'alerte après 3 secondes
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