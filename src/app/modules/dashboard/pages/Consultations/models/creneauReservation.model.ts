export interface CreneauReservation {
  id?: string; // Optional for creation
  medecinId: string;
  medecinName: string;
  date: string; // ISO string format e.g. '2025-05-18'
  heureDebut: string; // e.g. '09:00'
  heureFin: string;   // e.g. '09:30'
  disponible: boolean;
}
