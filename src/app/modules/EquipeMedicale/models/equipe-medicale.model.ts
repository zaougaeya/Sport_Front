export interface EquipeMedicale {
    id?: string;
    nomEquipeMedicale: string;
    descEquipeMedicale: string;
    membres?: string[]; // Store as array of user IDs
    consultations?: string[]; // Store as array of consultation IDs
  }
  