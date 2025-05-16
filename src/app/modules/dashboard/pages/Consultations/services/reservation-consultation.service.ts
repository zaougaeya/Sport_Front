import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationConsultationService {

  private apiUrl = 'http://localhost:8081/reservations'; // Adjust path

  constructor(private http: HttpClient) {}

  createReservation(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }

  getAllReservations(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}`);
}

  deleteReservationById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
    // ✅ Update a reservation by ID
  updateReservation(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData);
  }

  // ✅ Delete a reservation by ID
  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Get reservation by ID (optional)
  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

