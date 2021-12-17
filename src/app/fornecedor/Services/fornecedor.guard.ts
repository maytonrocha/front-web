import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LocalStorageUtils } from "src/app/Utils/LocalStorageUtils";

@Injectable()
export class FornecedorGuard implements CanActivate{

    localStorageUtils = new LocalStorageUtils();

    constructor(private routerNav:Router){}

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