import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMCRecord } from '../models/imcRecord.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IMCRecordService {

  private baseUrl = 'http://localhost:8081/imcRecords';

  constructor(private http: HttpClient) {}

  ajouterIMC(record: Partial<IMCRecord>): Observable<IMCRecord> {
    return this.http.post<IMCRecord>(`${this.baseUrl}/ajouter`, record);
  }

  getHistorique(patientId: string): Observable<IMCRecord[]> {
    return this.http.get<IMCRecord[]>(`${this.baseUrl}/historique/${patientId}`);
  }

  getAll(): Observable<IMCRecord[]> {
    return this.http.get<IMCRecord[]>(`${this.baseUrl}/all`);
  }

  deleteByPatientId(patientId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${patientId}`);
  }

  updateByPatientId(patientId: string, record: IMCRecord): Observable<IMCRecord> {
    return this.http.put<IMCRecord>(`${this.baseUrl}/update/${patientId}`, record);
  }
}

