import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LuzService {
  constructor(public http: HttpClient) { }

  carregaTodos(): Observable<any> {
    return this.http.get(environment.urlback + '/luz').pipe(
      catchError(this.handleError)
    );
  }

  salvar(luz): Observable<any> {
    return this.http.post(environment.urlback + '/luz/add', luz).pipe(
      catchError(this.handleError)
    );
  }

  editar(luz): Observable<any> {
    return this.http.put(environment.urlback + '/luz/update/' + luz._id, luz).pipe(
      catchError(this.handleError)
    );
  }


  finalizar(id): Observable<any> {
    return this.http.delete(environment.urlback + '/luz/del/' + id).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error('Backend returned code ${error.status}, ' + 'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError('Algo de errado aconteceu, tente novamente mais tarde.');
  }
}
