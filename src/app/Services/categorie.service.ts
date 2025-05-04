import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categorie } from '../core/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = "http://localhost:3000/categorie";

  constructor(private http: HttpClient) { }

  addCategory(data: categorie): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post(this.apiUrl, data);
  }

  getAllCategories(): Observable<categorie[]> {
    return this.http.get<categorie[]>(this.apiUrl);
  }
  deleteCategory(id: string): Observable<any> {
    console.log(`Deleting category with ID: ${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCategory(data: categorie): Observable<any> {
    console.log(`Updating category with ID: ${data._id}`);
    return this.http.put(`${this.apiUrl}/${data._id}`, data);
  }
}
