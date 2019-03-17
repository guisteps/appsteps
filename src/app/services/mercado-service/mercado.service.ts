import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  data: any;
  constructor(public http: HttpClient) { }

  carregaTodos(): Observable<any> {
    return this.http.get(environment.urlback + '/compras').pipe(
      map((data) => {
        this.data = data;
        return this.data;
      }),
      catchError(erro => {
        return throwError('Deu ruim nas compras: ' + erro);
      })
    );
  }


  salvar(compra): Observable<any> {
    return this.http.post(environment.urlback + '/compras/add', compra);
  }


  finalizar(compra): Observable<any> {
    return this.http.delete(environment.urlback + '/compras/del/' + compra._id);
  }
}
