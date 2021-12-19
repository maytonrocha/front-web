import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { LocalStorageUtils } from "../Utils/LocalStorageUtils";

export abstract class BaseGuard {

 private localStorageUtils= new LocalStorageUtils();

constructor(protected router:Router) { }

protected validarClaims(route:ActivatedRouteSnapshot): boolean{
  if (!this.localStorageUtils.obterTokenUsuario()){
    this.router.navigate(['/conta/login'], { queryParams: { returnUrl: route.url }});
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
  this.router.navigate(['/acesso-negado']);
}

}

