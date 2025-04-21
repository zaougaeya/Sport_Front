import { Match } from './match.model'; // si tu veux inclure les matchs liés

export interface Terrain {
  id: string;
  name: string;
  adresse: string;
  type: string;
  matchsReserves?: Match[]; // facultatif
}

export interface TerrainCreationDTO {
  name: string;
  adresse: string;
  type: string;
}
