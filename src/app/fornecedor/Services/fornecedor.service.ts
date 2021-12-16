import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/Services/base.services";
import { CepConsulta, Endereco } from "../Models/endereco";
import { Fornecedor } from "../Models/fornecedor";

@Injectable()
export class FornecedorService extends BaseService{
  constructor(private http:HttpClient){
      super();
  }

  obterTodos(): Observable<Fornecedor[]> {
     return this.http.get<Fornecedor[]>(this.UrlServiceV1 + "fornecedores", super.ObterHeaderJson())
      .pipe(catchError(super.serviceError))
  }

  excluirFornecedor(id:string): Observable<Fornecedor>{
     return new Observable<Fornecedor>();
  }

  atualizarFornecedor(fornecedor:Fornecedor): Observable<Fornecedor>{
    return this.http.put(this.UrlServiceV1 + "fornecedores/" + fornecedor.id, fornecedor, super.ObterAuthHeaderJson())
      .pipe(
        map(super.ExtractData),
        catchError(super.serviceError))
  }

  obterPorId(id:string): Observable<Fornecedor>{
    return this.http.get<Fornecedor>(this.UrlServiceV1 + "fornecedores/" + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))
 }

 novoFornecedor(fornecedor:Fornecedor): Observable<Fornecedor>{
  return this.http.post(this.UrlServiceV1 + "fornecedores", fornecedor, super.ObterAuthHeaderJson())
      .pipe(
        map(super.ExtractData),
        catchError(super.serviceError))
}

consultarCep(cep: string): Observable<CepConsulta> {
  return this.http
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError))
}

atualizarEndereco(endereco:Endereco): Observable<Endereco>{
  return new Observable<Endereco>();
}

}
