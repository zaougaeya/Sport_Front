import { Joueur } from './joueur.model';

export interface Equipe {
  id?: string;
  nameEquipe: string;
  logo: string;
  joueurs?: Joueur[];
  joueurInscrit?: number;
  joueurMax?: number;
 // maxJoueurs: number;
  //joueursInscrits: number;
}