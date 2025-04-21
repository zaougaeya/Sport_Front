import { Component, OnInit } from '@angular/core';
import { CommandeService } from './commande.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes: any[] = [];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
      }
    });
  }
}
