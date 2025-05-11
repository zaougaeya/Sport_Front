import { User } from "../../users/models/user.model";

export interface EquipeMedicale {
  id?: string; // optional for creation
  nomEquipeMedicale: string;
  descEquipeMedicale: string;
  membres: User[]; // empty list for now
  consultations: string[]; // empty list for now
}
