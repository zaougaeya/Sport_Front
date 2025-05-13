export interface StatistiqueEquipe {
    id?: string;           // Optionnel si généré par le backend
    matchId: string;
    equipeId: string;
    fautes: number;
    cartonsJaunes: number;
    cartonsRouges: number;
    but: number;
  }