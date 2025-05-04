import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommandeService } from '../../Services/commande.service';
import { Commande } from '../../models/commande.model';
import { SidebarComponent } from '../layout/components/sidebar/sidebar.component';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent]
  })
  export class CommandeComponent implements OnInit {
    commandes: Commande[] = [];
  
    constructor(private commandeService: CommandeService) {}
  
    ngOnInit(): void {
      this.getAllCommandes();
    }
  
    getAllCommandes(): void {
      this.commandeService.getAllCommandes().subscribe((data: Commande[]) => {
        this.commandes = data;
      });
    }
  
    deleteCommande(id: string): void {
      this.commandeService.deleteCommande(id).subscribe(() => {
        this.commandes = this.commandes.filter(commande => commande._id !== id);
      });
    }
  }