import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreneauReservation } from '../models/creneauReservation.model';

@Injectable({
  providedIn: 'root'
})
export class CreneauReservationService {

  private baseUrl = 'http://localhost:8081/creneaux';

  constructor(private http: HttpClient) {}

  createCreneau(creneau: CreneauReservation): Observable<CreneauReservation> {
    return this.http.post<CreneauReservation>(`${this.baseUrl}`, creneau);
  }

  getAllCreneaux(): Observable<CreneauReservation[]> {
    return this.http.get<CreneauReservation[]>(`${this.baseUrl}`);
  }

  getAvailableCreneaux(): Observable<CreneauReservation[]> {
    return this.http.get<CreneauReservation[]>(`${this.baseUrl}/available`);
  }

  getCreneauxByMedecinAndDate(medecinId: string, date: string): Observable<CreneauReservation[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<CreneauReservation[]>(`${this.baseUrl}/medecin/${medecinId}`, { params });
  }

  

  markCreneauAsUnavailable(id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/mark-unavailable`, {});
  }
getOccupiedCreneaux(): Observable<CreneauReservation[]> {
  return this.http.get<CreneauReservation[]>(`${this.baseUrl}/occupied`);
}

getOccupiedByMedecin(medecinId: string): Observable<CreneauReservation[]> {
  return this.http.get<CreneauReservation[]>(`${this.baseUrl}/occupied/medecin/${medecinId}`);
}
getOccupiedByMedecinAndDate(medecinId: string, date: string): Observable<CreneauReservation[]> {
  const params = new HttpParams().set('date', date);
  return this.http.get<CreneauReservation[]>(`${this.baseUrl}/occupied/medecin/${medecinId}/date`, { params });
}

getAvailableSlotsByMedecinAndDate(medecinId: string, date: string): Observable<{ heureDebut: string, heureFin: string }[]> {
  const params = new HttpParams().set('date', date);
  return this.http.get<{ heureDebut: string, heureFin: string }[]>(`${this.baseUrl}/available/medecin/${medecinId}`, { params });
}



}

