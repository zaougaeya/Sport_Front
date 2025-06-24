import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-reservation-qr',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  template: `
    <div class="qr-container" *ngIf="qrData">
      <h3>🔐 Code QR de votre réservation :</h3>
      <qrcode [qrdata]="qrData" [width]="250" [errorCorrectionLevel]="'M'"></qrcode>
    </div>
  `,
  styleUrls: ['./reservation-qr.component.scss']
})
export class ReservationQrComponent {
  @Input() reservation!: any;

  get qrData(): string {
    if (!this.reservation) return '';

    const payload = {
      id: this.reservation.id,
      materiel: this.reservation.materielName,
      user: this.reservation.reservedBy,
      startDate: this.reservation.startDate?.slice(0, 10),
      endDate: this.reservation.endDate?.slice(0, 10),
      quantity: this.reservation.quantity,
      totalPrice: this.reservation.totalPrice
    };

    return JSON.stringify(payload);
  }
}
