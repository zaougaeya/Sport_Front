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

export type Role = 'ADMIN' | 'MEDECIN' | 'PATIENT' | 'SECRETAIRE' | string; // Adjust based on your backend Role enum
