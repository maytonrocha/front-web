import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/Services/base.guard";
import { NovoComponent } from "../novo/novo.component";

@Injectable()
export class FornecedorGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent> {

    constructor(protected routerNav:Router){ super(routerNav); }
    canDeactivate(component: NovoComponent) {
        if (component.mudancasNaoSalvas){
            return window.confirm("Tem certeza que deseja abandonar o preenchimento do formulário?")
        }

        return true;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        return super.validarClaims(route);
    }
}
