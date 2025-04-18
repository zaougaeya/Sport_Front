import { Joueur } from './joueur.model'; 

export interface Equipe {
  id: string;
  nameEquipe: string;
  logo: string;
  joueurs?: Joueur[]; 
}