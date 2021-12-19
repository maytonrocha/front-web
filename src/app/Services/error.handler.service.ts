import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "../Utils/LocalStorageUtils";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    localStorageUtils = new LocalStorageUtils();

    constructor(private route:Router){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
           if (error instanceof HttpErrorResponse)
           {
               if (error.status === 401){
                    this.localStorageUtils.limparDadosLocaisUsuario();
                    this.route.navigate(['/conta/login'], { queryParams: { returnUrl: this.route.url }})
               }
               if (error.status === 403){
                   this.route.navigate(['/acesso-negado']);
               }
           }
           return throwError(error);
        }));
    }
}
