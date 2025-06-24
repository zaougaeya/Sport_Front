import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reservation} from "./reservation.model";
import {Materiel} from "../materiels/materiel.model";

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = 'http://localhost:8084/api/reservations';

  constructor(private http: HttpClient) {}

  getAllMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>('http://localhost:8084/api/reservations/materiels');
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/calendar`);
  }
  confirmPaiement(id: string): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/${id}/confirm`, {});
  }



  createReservation(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      ...payload,
      startDate: new Date(payload.startDate).toISOString(),
      endDate: new Date(payload.endDate).toISOString()
    });
  }
  getUserReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user`);
  }
  getMaterielById(id: string): Observable<Materiel> {
    return this.http.get<Materiel>(`${this.apiUrl}/materiel/${id}`);
  }
  getReservationsByMateriel(materielId: string) {
    return this.http.get<Reservation[]>(`${this.apiUrl}/materiel/${materielId}`);
  }
}
