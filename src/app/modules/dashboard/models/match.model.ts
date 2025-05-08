export interface Match {
  id?: string;
  idEquipe1?: string;
  idEquipe2?: string;
  idTerrain?: string;
  date?: Date;
  scoreEquipe1?: number;
  scoreEquipe2?: number;
  startDate: Date; // ⬅️ nouveau champ
  endDate: Date;
  type: string;
  // objets liés (optionnel si tu veux les afficher)
  equipe1?: any;
  equipe2?: any;
  terrain?: any;
  matchJoue: boolean;
}
