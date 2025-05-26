  export interface SessionDeJeu {
nom: any;
equipe1Joueurs: any;
  id?: string;
  startDate: Date;
  endDate: Date;
  typeMatch: string;
  terrainId: string;
  idEquipe1:string;
  idEquipe2:string;
  maxJoueurs: number;
  joueursInscrits: number;
  joueurs: any[];
  statut: string;
}