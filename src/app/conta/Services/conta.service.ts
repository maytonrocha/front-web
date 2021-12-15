import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/Services/base.services";
import { Usuario } from "../Models/usuario";

@Injectable()
export class ContaService extends BaseService { 
    
    constructor(private http:HttpClient) { 
        super(); 
    }

    registrarUsuario(usuario:Usuario): Observable<Usuario> { 
        let response = this.http.post(this.UrlServiceV1 + 'nova-conta', usuario, this.ObterHeaderJson())
          .pipe(
              map(this.ExtractData),
              catchError(this.serviceError));

          return response;
    }

    login(usuario:Usuario): Observable<Usuario>{ 
        let response = this.http.post(this.UrlServiceV1 + 'entrar', usuario, this.ObterHeaderJson())
          .pipe(
              map(this.ExtractData),
              catchError(this.serviceError));

          return response;
    }
}