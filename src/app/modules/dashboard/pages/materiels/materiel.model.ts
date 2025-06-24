export interface Materiel {
  id: string;
  name: string;
  sportType?: string;
  quantity: number;
  color?: string;
  state: 'neuf' | 'bon' | 'usage' | 'endommagé';
  noteInterne: string; // Ajoutez cette ligne
  imageUrl: string;
  price: number;
  // ✅ AJOUTER ICI

}
