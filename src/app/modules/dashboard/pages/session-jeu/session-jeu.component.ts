import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { EquipeService } from '../../services/equipe.service';
import { Match } from '../../models/match.model';
import { Equipe } from '../../models/equipe.model';

@Component({
  selector: 'app-session-jeu',
  templateUrl: './session-jeu.component.html',
  styleUrls: ['./session-jeu.component.scss']
})
export class SessionJeuComponent implements OnInit {
  matchsJoues: (Match & { equipe1?: Equipe; equipe2?: Equipe })[] = [];
  equipes: Equipe[] = [];

  constructor(
    private matchService: MatchService,
    private equipeService: EquipeService
  ) {}

  ngOnInit(): void {
    // Charger les équipes d'abord
    this.equipeService.getAllEquipes().subscribe({
      next: (equipes) => {
        this.equipes = equipes;

        // Charger les matchs joués
        this.matchService.getMatchsJoues().subscribe({
          next: (data) => {
            // Enrichir chaque match avec ses équipes
            this.matchsJoues = data.map(match => ({
              ...match,
              equipe1: this.equipes.find(e => e.id === match.idEquipe1),
              equipe2: this.equipes.find(e => e.id === match.idEquipe2),
            }));
          },
          error: (err) => {
            console.error('Erreur chargement matchs', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement équipes', err);
      }
    });
  }
}
