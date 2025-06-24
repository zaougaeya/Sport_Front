import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ReservationService } from '../reservation/reservation.service';
import { MaterielService } from '../materiels/materiel.service';
import { Materiel } from '../materiels/materiel.model';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservationDetail.component.html',
  styleUrls: ['./reservationDetail.scss']
})
export class ReservationDetailComponent implements OnInit {
  reservationForm!: FormGroup;
  materielId!: string;
  materiel!: Materiel;
  terrains = ['FootBall', 'Padel', 'Tennis','BasketBall'];
  disableDates: Date[] = [];
  today: string = '';
  totalPrice: number = 0;
  currentUser: any;
  qrData: string | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private materielService: MaterielService
  ) {}

  ngOnInit(): void {
    this.today = new Date().toISOString().split("T")[0];

    this.materielId = this.route.snapshot.paramMap.get('materielId')!;
    this.loadMateriel();
    this.loadReservations();

    this.reservationForm = this.fb.group({
      terrainId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      note: [''],

    });

    this.reservationForm.valueChanges.subscribe(() => this.updateTotalPrice());


  }

  loadMateriel() {
    this.materielService.getMaterielById(this.materielId).subscribe(res => {
      this.materiel = res;
      this.updateTotalPrice();
    });
  }

  loadReservations() {
    this.reservationService.getReservationsByMateriel(this.materielId).subscribe(res => {
      this.disableDates = this.getDisabledDatesFromReservations(res);
    });
  }

  getDisabledDatesFromReservations(reservations: any[]): Date[] {
    const disabled: Date[] = [];
    reservations.forEach(r => {
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        disabled.push(new Date(d));
      }
    });
    return disabled;
  }

  isDateAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isReserved = this.disableDates.some(d =>
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    );

    return date >= today && !isReserved;
  };

  isQuantityValid(): boolean {
    const quantity = this.reservationForm.value.quantity || 0;
    return quantity <= (this.materiel?.quantity || 0);
  }

  updateTotalPrice() {
    const qty = this.reservationForm?.value?.quantity || 0;
    const unitPrice = this.materiel?.price || 0;
    const start = new Date(this.reservationForm?.value?.startDate);
    const end = new Date(this.reservationForm?.value?.endDate);

    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.totalPrice = 0;
      return;
    }

    const days = Math.max(1, Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    this.totalPrice = qty * unitPrice * days;
  }





  submitReservation() {
    if (this.reservationForm.invalid || !this.isQuantityValid()) return;

    const start = this.reservationForm.value.startDate;
    const end = this.reservationForm.value.endDate;

    const startDate = new Date(start);
    const endDate = new Date(end);
    let conflict = false;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const current = new Date(d);
      if (!this.isDateAvailable(current)) {
        conflict = true;
        break;
      }
    }

    if (conflict) {
      Swal.fire('Erreur', 'Les dates sélectionnées ne sont pas disponibles.', 'error');
      return;
    }
    const payload = {
      materielId: this.materielId,
      terrain: this.reservationForm.value.terrainId,
      quantity: this.reservationForm.value.quantity,
      note: this.reservationForm.value.note,
      startDate: new Date(start).toISOString(),
      endDate: new Date(end).toISOString(),
      reservedBy: 'test-user-id-123'
    };
    console.log('Payload envoyé:', payload);


    this.reservationService.createReservation(payload).subscribe({
      next: () => {
        Swal.fire('Succès', 'Réservation effectuée avec succès !', 'success');

        this.qrData = JSON.stringify({
          materiel: this.materiel.name,
          terrain: this.reservationForm.value.terrainId,
          quantity: this.reservationForm.value.quantity,
          startDate: this.reservationForm.value.startDate,
          endDate: this.reservationForm.value.endDate,
          totalPrice: this.totalPrice,
          reservedBy: 'test-user-id-123'
        });

        this.reservationForm.reset();
      },


      error: () => {
        Swal.fire('Erreur', 'Réservation échouée', 'error');
      }
    });
  }

  downloadQr() {
    const qrCanvas = document.querySelector('qrcode canvas') as HTMLCanvasElement;

    if (qrCanvas) {
      // Créer un canvas plus grand pour inclure le texte
      const padding = 40;
      const width = qrCanvas.width + 40;
      const height = qrCanvas.height + 100;

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = width;
      finalCanvas.height = height;

      const ctx = finalCanvas.getContext('2d')!;

      // Fond blanc
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);

      // Titre
      ctx.fillStyle = '#111';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🏟️ SportSync', width / 2, 30);

      // Message
      ctx.font = '16px Arial';
      ctx.fillText('Merci pour votre réservation !', width / 2, 55);
      ctx.fillText('Voici votre QR Code de paiement', width / 2, 75);

      // Dessiner le QR code au centre
      ctx.drawImage(qrCanvas, padding / 2, 90);

      // Télécharger
      const link = document.createElement('a');
      link.href = finalCanvas.toDataURL('image/png');
      link.download = 'qr-reservation.png';
      link.click();
    } else {
      console.error('QR code canvas not found');
    }
  }



  cancel() {
    this.reservationForm.reset();
    this.totalPrice = 0;
  }

}
