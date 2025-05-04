import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { article } from '../core/models/article';
import { categorie } from '../core/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/article';
  private categoriesUrl = 'http://localhost:3000/categorie';

  constructor(private http: HttpClient) { }

  addArticle(data: article): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllArticles(): Observable<article[]> {
    return this.http.get<article[]>(this.apiUrl);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateArticle(data: article): Observable<any> {
    return this.http.put(`${this.apiUrl}/${data._id}`, data);
  }

  getAllCategories(): Observable<categorie[]> {
    return this.http.get<categorie[]>(this.categoriesUrl);
  }
  getCategoryById(id: string): Observable<categorie> {
    return this.http.get<categorie>(`${this.categoriesUrl}/${id}`);
  }

  getArticlesByName(name: string): Observable<article[]> {
    return this.http.get<article[]>(`${this.apiUrl}/${name}`);
  }
}

