import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { BaseService } from "src/app/Services/base.services";
import { Fornecedor } from "../Models/fornecedor";

@Injectable()
export class FornecedorService extends BaseService{
  constructor(private http:HttpClient){
      super();
  }

  obterTodos(): Observable<Fornecedor[]> {
     return this.http.get<Fornecedor[]>(this.UrlServiceV1 + 'fornecedor', this.ObterHeaderJson())
      .pipe(catchError(super.serviceError))
  }

  excluirFornecedor(id:string): Observable<Fornecedor>{
     return new Observable<Fornecedor>();
  }

  atualizarFornecedor(fornecedor:Fornecedor): Observable<Fornecedor>{
    return new Observable<Fornecedor>();
  }

  obterPorId(id:string): Observable<Fornecedor>{
    return new Observable<Fornecedor>();
 }

 novoFornecedor(fornecedor:Fornecedor): Observable<Fornecedor>{
  return new Observable<Fornecedor>();
}

}
