
export class article {
  _id?: string;
  namearti!: string;
  desc!: string;
  prix!: number;
  picturearti!: string;
  Quantite!: number;
  category!: string;
  dateAdded: Date = new Date();
  discount!: number;
  prixApresRemise?: number;
}
