import { categorie } from "src/app/core/models/categorie";
export class produit {
  _id?: string;
  nameprod!: string;
  desc!: string;
  prix!: number;
  pictureprod!: string;
  quantiteprod!: number;
  categoryprod!: string;  
  dateAddedprod: Date = new Date();
}
