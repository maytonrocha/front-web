import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/Utils/LocalStorageUtils";

@Component({
   selector: 'app-menu-login',
   templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {
    token: string = "";
    user: any;
    email: string = "";
    localStorageUser = new LocalStorageUtils();

    constructor(private router:Router){  }

    usuarioLogado():boolean{
        this.token = this.localStorageUser.obterTokenUsuario();
        this.user = this.localStorageUser.obterUsuario();

        if (this.user)
           this.email = this.user.email;

        return this.token != null;  
    }

    logout(){
        this.localStorageUser.limparDadosLocaisUsuario();
        this.router.navigate(['/home']);
    }

}