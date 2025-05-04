import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { produit } from 'src/app/core/models/produit'
import { categorie } from 'src/app/core/models/categorie'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/produit';
  private categoriesUrl = 'http://localhost:3000/categorie';

  constructor(private http: HttpClient) { }

  addProduct(data: produit): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllProducts(): Observable<produit[]> {
    return this.http.get<produit[]>(this.apiUrl);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProduct(data: produit): Observable<any> {
    return this.http.put(`${this.apiUrl}/${data._id}`, data);
  }

  getAllCategories(): Observable<categorie[]> {
    return this.http.get<categorie[]>(this.categoriesUrl);
  }
  getCategoryById(id: string): Observable<categorie> {
    return this.http.get<categorie>(`${this.categoriesUrl}/${id}`);
  }}