import { Match } from './match.model'; // si tu veux inclure les matchs liés

export interface Terrain {
  id: string;
  name: string;
  adresse: string;
  type: string;
  matchsReservés?: Match[]; // facultatif
}
