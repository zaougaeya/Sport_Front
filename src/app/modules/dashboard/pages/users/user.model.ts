// src/app/models/user.model.ts

export interface User {
    id: string;
    nom: string;
    prenom: string;
    age: number;
    sexe: string;
    tel: string;
    adresse: string;
    email: string;
    profession: string;
    role: Role;
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
    LIVREUR = 'LIVREUR'
  }
  