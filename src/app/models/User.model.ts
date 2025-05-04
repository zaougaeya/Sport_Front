// src/app/models/user.model.ts

export interface User {
    id?: string;
    nomuser: string;
    prenomuser: string;
    ageuser: number;
    phoneuser: number;
    sexeuser: 'male' | 'femme' | 'autre';
    mailuser: string;
    passworduser: string;
    addresseuser: string;
}
