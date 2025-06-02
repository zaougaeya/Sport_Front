export interface Match {
  joueurMax?: any;
  joueurInscrit1?: any;
  joueurInscrit2?: any;
  id?: string;
  idEquipe1: string;
  idEquipe2: string;
  idTerrain?: string;
  date?: Date;
  startDate: Date;
  endDate: Date;
  type: string;
  scoreEquipe1?: number;
  scoreEquipe2?: number;
  cartonsJaunesEquipe1?: number;
  cartonsRougesEquipe1?: number;
  cartonsJaunesEquipe2?: number;
  cartonsRougesEquipe2?: number;
  fautesEquipe1?: number;
  fautesEquipe2?: number;
  equipe1?: any;
  equipe2?: any;
  terrain?: any;
  matchJoue: boolean;

}
