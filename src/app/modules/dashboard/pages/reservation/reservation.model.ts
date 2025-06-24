import {Materiel} from "../materiels/materiel.model";

export interface Reservation {
  id?: string;
  nom: string;
  email: string;
  dateReservation: Date;
  objet: string;
  statut: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE' | 'PAID';
  materiel: Materiel; // assure-toi que c'est bien un objet, pas juste un string
  startDate: string;
  endDate: string;
  status: string;
  note?: string;
  quanity: string;
  terrainId: string; // <-- nouveau champ
  reservedBy?: string;
  paid?: boolean;
  totalPrice: string;

  materielId?: string;
  materielName?: string;
  materielImageUrl?: string;


}
