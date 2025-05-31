import {Materiel} from "../materiels/materiel.model";

export interface Reservation {
  id?: string;
  nom: string;
  email: string;
  dateReservation: Date;
  objet: string;
  statut: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE';
  materiel: Materiel; // assure-toi que c'est bien un objet, pas juste un string
  startDate: string;
  endDate: string;
  status: string;
  note?: string;
}
