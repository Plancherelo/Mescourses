import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { IShop } from './ishop';

const API_URL = "http://localhost:1992/api/v1/shops";

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

export class ManageShopService{
  
  constructor(private http: HttpClient) {}

  // POST le magasin dans la base de donnée
  postShop(data: IShop): Observable<any> {
    return this.http
      .post<IShop>(API_URL, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // GET les magasins de la base de donnée
  getAllShop() : Observable<any> {
    return this.http
      .get<IShop[]>(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get shop - Non Utilisé
  getShop(id: string): Observable<any> {
    return this.http
      .get<IShop>(API_URL +"/" + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PATCH le magasin, c'est-à-dire mettre à jour ses informations. On n'utilise pas le PUT.
  patchShop(data: IShop, id: string): Observable<any> {
    return this.http
      .patch(API_URL +"/" + id, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // DELETE un magasin de la base de donnée
  deleteShop(id: string): Observable<any> {
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