// src/app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // En vrai, ceci sera extrait du token
  private user = {
    id: 'fake-user-id',
    firstName: 'John',
    lastName: 'Doe',
    connected: true // ← mettre false pour tester le cas non connecté
  };

  getCurrentUser() {
    return this.user.connected ? this.user : null;
  }
}
