import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageUtils } from "src/app/Utils/LocalStorageUtils";
import { CadastroComponent } from "../cadastro/cadastro.component";

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate {
    
    constructor(private route: Router){

    }

    localStorageUser = new LocalStorageUtils();

    canActivate() {
        if (this.localStorageUser.obterTokenUsuario()){
            this.route.navigate(['/home'])
        }

        return true;
    }

    canDeactivate(component: CadastroComponent) {
        if (component.mudancasNaoSalvas){
            return window.confirm("Tem certeza que deseja abandonar o preenchimento do formulário?")
        }
        return true;
    }
}