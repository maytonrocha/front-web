import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/Services/base.services";
import { Fornecedor, Produto } from "../Models/produto";

@Injectable()
export class ProdutoService extends BaseService { 
    constructor(private http:HttpClient){
        super();
    }

    ObterTodos(): Observable<Produto[]>{
       return this.http.get<Produto[]>(this.UrlServiceV1 + "/produtos", this.ObterAuthHeaderJson())
           .pipe(catchError(super.serviceError));
    }

    ObterFornecedores(): Observable<Fornecedor[]>{
        return this.http.get<Fornecedor[]>(this.UrlServiceV1 + "/fornecedores", this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
     }

    excluirProduto(id:string): Observable<Produto>{
        return this.http.delete(this.UrlServiceV1 + "produtos/" + id, super.ObterAuthHeaderJson())
        .pipe(
          map(super.ExtractData),
          catchError(super.serviceError))
      }
    
      atualizarProduto(produto:Produto): Observable<Produto>{
        return this.http.put(this.UrlServiceV1 + "produtos/" + produto.id, produto, super.ObterAuthHeaderJson())
          .pipe(
            map(super.ExtractData),
            catchError(super.serviceError))
      }
    
      obterPorId(id:string): Observable<Produto>{
        return this.http.get<Produto>(this.UrlServiceV1 + "produtos/" + id, super.ObterAuthHeaderJson())
          .pipe(catchError(super.serviceError))
     }
    
     novoProduto(produto:Produto): Observable<Produto>{
      return this.http.post(this.UrlServiceV1 + "produtos", produto, super.ObterAuthHeaderJson())
          .pipe(
            map(super.ExtractData),
            catchError(super.serviceError))
    }
}