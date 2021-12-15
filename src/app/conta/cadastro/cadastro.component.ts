import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { Usuario } from '../Models/usuario';
import { ContaService } from '../Services/conta.service';
import { CustomValidators } from '@narik/custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formImputElement: ElementRef[];

  mudancasNaoSalvas:boolean;
  errors: any = [];
  validationMessages: ValidationMessages;
  genericValidation: GenericValidator;
  displayMessage: DisplayMessage = {};
  cadastroForm: FormGroup;
  usuario: Usuario;

  constructor(private fb:FormBuilder,
              private contaService:ContaService,
              private route: Router,
              private toastr: ToastrService) {

                this.validationMessages = {
                  email: {
                    required: 'Informe o e-mail',
                    email: 'Email inválido'
                  },
                  password: {
                    required: 'Informe a senha',
                    rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
                  },
                  confirmPassword: {
                    required: 'Informe a senha novamente',
                    rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
                    equalTo: 'As senhas não conferem'
                  }
                };

                this.genericValidation = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    })
  }

  ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formImputElement
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(()=> {
              this.displayMessage = this.genericValidation.processarMensagens(this.cadastroForm);
              this.mudancasNaoSalvas = true;
        })
  }

  adicionarConta(){
    if (this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)

      this.contaService.registrarUsuario(this.usuario)
         .subscribe(
           sucesso => {this.processarSucesso(sucesso)},
           falha => {this.processarFalha(falha)}
         );         
    }
    this.mudancasNaoSalvas = false;  
  }

  processarSucesso(response: any){
     this.cadastroForm.reset();
     this.errors=[];

     this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

     let toastr = this.toastr.success("Registro realizado com sucesso!", "Seja bem-vindo");

     if (toastr){
       toastr.onHidden.subscribe(()=>{
        this.route.navigate(['/home']);
       });
     }


     //this.route.navigate(['/home']);
  }

  processarFalha(response: any){
     this.errors = response.error.errors; 
     this.toastr.error("Ocorreu um erro!", "Opa :(")    
  }

}
