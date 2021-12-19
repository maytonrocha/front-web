import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";
import { FormBaseComponent } from "src/app/base-components/form-base.component";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/app/Utils/generic-form-validation";
import { Fornecedor, Produto } from "../Models/produto";

export abstract class ProdutoFormBase extends FormBaseComponent {

  produto: Produto;
  fornecedores: Fornecedor[];
  formResult: string = '';
  produtoForm: FormGroup;

  constructor() {
    super();
    super.validationMessages = {
      fornecedorId:{
        required: 'Escolha um fornecedor',
      },
      nome:{
        required: 'Informe o nome',
        minlength: 'Mínimo de 2 carasteres',
        maxlength: 'Máximo de 200 carasteres',
      },
      descricao:{
        required: 'Informe a descricao',
        minlength: 'Mínimo de 2 carasteres',
        maxlength: 'Máximo de 2000 carasteres',
      },
      image:{
        required: 'Informe a imagem',
      },
      valor:{
        required: 'Informe o valor'
      }
    }

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

 /* configurarValidaoFormulario(formInputElements:ElementRef[]){
    let controlBlurs: Observable<any>[] = formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.produtoForm);
    this.mudancasNaoSalvas = true;
  });
}*/

}

