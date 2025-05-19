import { Livreur } from '../livreurs/livreur.model'
import { User } from '../users/user.model'

export interface Commande {
  idCommande: string;
  montantTotal: number;
  dateCommande: string;
  adresseLivraison: string;
  nomClient: string;
  emailClient: string;
  telephoneClient: string;
  statutCommande: StatutCommande;
  livreur?: Livreur; // Remplacé "any" par le modèle Livreur
  client?: User;     // Remplacé "any" par le modèle User
  produits?: CommandeProduit[];
}

export enum StatutCommande {
  EN_PREPARATION = 'EN_PREPARATION',
  EXPEDIEE = 'EXPEDIEE',
  LIVREE = 'LIVREE',
  ANNULEE = 'ANNULEE'
}

export interface CommandeProduit {
  produit: {
    nom: string;
    prix: number;
  };
  quantite: number;
  prixUnitaire: number;
  prixTotal: number;
}
