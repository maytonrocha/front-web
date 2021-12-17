import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Produto } from "../Models/produto";
import { ProdutoService } from "./produto.service";

@Injectable()
export class ProdutoResolve implements Resolve<Produto> {
    constructor(private ProdutoService: ProdutoService){ }

    resolve(route: ActivatedRouteSnapshot) {
        return this.ProdutoService.obterPorId(route.params['id']);
    }
}