export interface User {
    _id?: string; // Optional because it won't be present when creating a new user
    nomuser: string;
    prenomuser: string;
    ageuser: number;
    phoneuser: number;
    sexeuser: 'male' | 'femme' | 'autre';
    mailuser: string;
    passworduser: string;
    addresseuser: string;
  }
  