import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from '../models/consultation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {

  private apiUrl = 'http://localhost:8081/consultations'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

createConsultation(consultation: Consultation): Observable<Consultation> {
  return this.http.post<Consultation>(this.apiUrl, consultation);
}
getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.apiUrl);
  }

  deleteConsultation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getConsultationById(id: string): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/${id}`);
  }


}
