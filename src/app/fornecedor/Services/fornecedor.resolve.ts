import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Fornecedor } from "../Models/fornecedor";
import { FornecedorService } from "./fornecedor.service";

@Injectable()
export class FornecedorResolve implements Resolve<Fornecedor>{
    constructor(private fornecedorService: FornecedorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.fornecedorService.obterPorId(route.params['id']);
    }
    
}