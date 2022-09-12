import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { IShoppingList } from './ishopping-list';

const API_URL = "http://localhost:1992/api/v1/mainlist";

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
export class ManageMainListService{

  constructor(private http: HttpClient) {}

  // POST la liste de courses dans la base de donnée
  postShopping(data: IShoppingList): Observable<any> {
    return this.http
      .post<IShoppingList>(API_URL, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // GET les listes de courses de la base de donnée
  getAllShopping() : Observable<any> {
    return this.http
      .get<IShoppingList[]>(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get une liste de courses
  getShopping(id: string): Observable<any> {
    return this.http
      .get<IShoppingList>(API_URL +"/" + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PATCH la liste de courses, c'est-à-dire mettre à jour ses informations. On n'utilise pas le PUT.
  patchShopping(data: IShoppingList, id: string): Observable<any> {
    return this.http
      .patch(API_URL +"/" + id, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // DELETE la liste de courses de la base de donnée
  deleteShopping(id: string): Observable<any> {
    return this.http
      .delete(API_URL +"/" + id, httpOptions)
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
