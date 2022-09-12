import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICategory } from './icategory';

const API_URL = "http://localhost:1992/api/v1/categories";

const httpOptions : any = {
  headers: new HttpHeaders({
    // Donne l'info qu'on communique en json
    'Content-Type':  'application/json'
  }),
  // Donne l'info d'une réponse en json
  responseType: 'json',
};

@Injectable({
  providedIn: 'root'
})
export class ManageCategoryService {

  constructor(private http: HttpClient) {  }  

  // POST la catégorie dans la base de donnée
  postCategory(data: ICategory): Observable<any> {
    return this.http
      .post<ICategory>(API_URL, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // GET les listes de courses de la base de donnée
  getAllCategory() : Observable<any> {
    return this.http
      .get<ICategory[]>(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get catégorie - Non Utilisé
  getCategory(category_id: string): Observable<any> {
    return this.http
      .get<ICategory>(API_URL +"/" + category_id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PATCH la catégorie, c'est-à-dire mettre à jour ses informations. On n'utilise pas le PUT.
  patchCategory(data: ICategory, category_id: string): Observable<any> {
    return this.http
      .patch(API_URL +"/" + category_id, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // DELETE la catégorie de la base de donnée
  deleteCategory(category_id: string): Observable<any> {
    return this.http
      .delete(API_URL +"/" + category_id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Gérer les erreurs éventuelles - Source https://laratutorials.com/angular-13-crud-example-with-web-api/
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Gérer les erreurs client
      errorMessage = error.error.message;
    } else {
      // Gérer les erreurs serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Imprimer le message d'erreur
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}