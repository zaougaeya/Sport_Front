export interface ReservationCreateDto {
  reservedBy?: string; // facultatif, rempli côté backend
  materielId: string;
  startDate: Date;
  endDate: Date;
}
