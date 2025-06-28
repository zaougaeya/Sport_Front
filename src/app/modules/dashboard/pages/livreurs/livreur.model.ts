// src/app/dashboard/pages/livreurs/livreur.model.ts
export interface Livreur {
    idLivreur?: string;
    nom: string;
    prenom: string;
    numeroTelephone: string;
    email: string;
    statutLivreur: 'DISPONIBLE' | 'EN_COURS_DE_LIVRAISON';
    commandes?: any[]; // à remplacer plus tard
  }
  