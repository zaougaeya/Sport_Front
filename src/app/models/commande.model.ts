export interface Commande {
    _id?: string;       // Use '?' to indicate that this property is optional
    userId: string;
    panierId: string;
    orderTotal?: number; // Add any additional fields here
    createdAt?: Date;
  }
  