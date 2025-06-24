import { Component, AfterViewInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';

import Swal from "sweetalert2";
declare var Html5QrcodeScanner: any;

@Component({
  selector: 'app-reservation-validation',
  templateUrl: './reservationvalidation.component.html',
  styleUrls: ['./reservationvalidation.component.scss']
})
export class ReservationvalidationComponent implements AfterViewInit {
  qrResult: any = null;
constructor(
  private reservationService: ReservationService,

) {
}


  ngAfterViewInit(): void {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText: string) => {
        try {
          const parsed = JSON.parse(decodedText);
          this.qrResult = parsed;
          console.log('✅ QR Data:', parsed);
        } catch {
          this.qrResult = { raw: decodedText };
          console.warn('QR code non JSON:', decodedText);
        }
        scanner.clear(); // facultatif : arrête la caméra après scan
      },
      (error: any) => {
        // Pas besoin d'afficher toutes les erreurs
      }
    );
  }

  confirmPaiement() {
    if (!this.qrResult || !this.qrResult.id) {
      Swal.fire('Erreur', 'QR invalide ou ID manquant', 'error');
      return;
    }

    this.reservationService.confirmPaiement(this.qrResult.id).subscribe({
      next: () => {
        Swal.fire('Succès', 'Paiement confirmé ✅', 'success');
      },
      error: () => {
        Swal.fire('Erreur', 'Échec lors de la confirmation', 'error');
      }
    });
  }

}
