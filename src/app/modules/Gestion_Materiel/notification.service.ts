import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showSuccess(message: string): void {
    alert('Succès: ' + message); // Remplacez par une vraie implémentation de notification
  }

  showError(message: string): void {
    alert('Erreur: ' + message); // Remplacez par une vraie implémentation de notification
  }
}
