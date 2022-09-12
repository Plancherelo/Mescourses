import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { IProduct } from './iproduct';

const API_URL = "http://localhost:1992/api/v1/mainlist/";

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

export class ManageProductService{

  constructor(private http: HttpClient) {}

  // POST le produit dans la base de donnée
  postProduct(_main_list_id : string, data: any): Observable<any> {
    return this.http
      .post<any>(API_URL + _main_list_id + "/products", data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // GET les produits de la base de donnée
  getAllProduct(_main_list_id : string) : Observable<any> {
    return this.http
      .get<IProduct[]>(API_URL + _main_list_id + "/products", httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get un produit - Non Utilisé
  getProduct(id: string): Observable<any> {
    return this.http
      .get<IProduct>(API_URL +"/" + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PATCH le produit, c'est-à-dire mettre à jour ses informations. On n'utilise pas le PUT.
  patchProduct(_main_list_id : string, data: any, id: string): Observable<any> {
    return this.http
      .patch(API_URL + _main_list_id + "/products/"+ id, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // DELETE un produit de la base de donnée
  deleteProduct(_main_list_id : string, _product_id: string): Observable<any> {
    return this.http
      .delete(API_URL + _main_list_id + "/products/" + _product_id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Chaque fois qu'on coche un article, l'inscrire dans la base de donnée
  checkProduct(_main_list_id : string, data: any, id: string){
    return this.http
      .patch(API_URL + _main_list_id + "/products/" + id, { product_check : !data.product_check} )
      .pipe(catchError(this.handleError));
  }
  
  // Gérer les erreurs éventuelles - Source https://laratutorials.com/angular-13-crud-example-with-web-api/, dernière visite le 19.07.2021
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
