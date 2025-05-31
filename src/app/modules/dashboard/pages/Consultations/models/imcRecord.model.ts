export interface IMCRecord {
  id?: string;
  patientId: string;
  tailleCm: number;
  poidsKg: number;
  imc?: number;
  imcCategory?: string;
  dateEnregistrement?: Date;
}
