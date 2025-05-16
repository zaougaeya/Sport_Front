export interface ReservationConsultation {
  id?: string;
  dateConsultation: Date; // ISO string or JS Date object
  equipeMedicaleId: string;
  medecinId: string;
  patientId: string;
  specialite: string; // e.g., "Cardiologie"
  statutConsultation: string; // e.g., "A_TRAITER" "A_VENIR", "FINIE", "ANNULEE"
  motifConsultation: string;
  moyenCommunication: string; // "Présentiel", "Visio", "Téléphone"
  isUrgent: string; // "oui" or "non"
  dureeConsultation: string; // ISO 8601 Duration like "PT30M" or a string (e.g., "00:30:00")
  consultationId?: string;
}
