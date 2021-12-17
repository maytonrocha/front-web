import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LocalStorageUtils } from "src/app/Utils/LocalStorageUtils";
import { NovoComponent } from "../novo/novo.component";

@Injectable()
export class ProdutoGuard implements CanActivate, CanDeactivate<NovoComponent> { 
    
    localStorageUtils = new LocalStorageUtils();

    constructor(private routerNav:Router){}

    canDeactivate(component: NovoComponent) {
        if (component.mudancasNaoSalvas){
           return window.confirm("Tem certeza que deseja abandonar o preenchimento do formulário?");
        }

        return true;
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.localStorageUtils.obterTokenUsuario()){
            this.routerNav.navigate(['/conta/login']);
        }

        let user = this.localStorageUtils.obterUsuario();
        let data:any = route.data[0];

        if (data !== undefined){
            let claim = route.data[0]['claim'];

            if (claim) {
                if (!user.claims){
                    this.navegateToNegado();
                }

                let claimsUser = user.claims.find(x => x.type === claim.name)

                if (!claimsUser){
                    this.navegateToNegado();
                }

                let valoresClaims = claimsUser.value as string;

                if (!valoresClaims.includes(claim.value)){
                    this.navegateToNegado();
                }
            }
        }
        return true;
    }

    navegateToNegado(){
        this.routerNav.navigate(['/acesso-negado']);
    }


}