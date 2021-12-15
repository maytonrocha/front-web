import { HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../Utils/LocalStorageUtils";

export abstract class BaseService {
    
    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.ApiUrlv1;

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json'
            })
        };
    }

    protected ExtractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any){
        let customError:string[]=[];

        if (response.statusText === 'Unknown Error'){
            customError.push('Ocorreu um erro desconhecido');
            response.erro.Error = customError;
            
        }

        console.error(response);
        return throwError(response);
    }


}