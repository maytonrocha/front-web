import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { Usuario } from '../Models/usuario';
import { ContaService } from '../Services/conta.service';
import { CustomValidators } from '@narik/custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formImputElement: ElementRef[];

  errors: any = [];
  validationMessages: ValidationMessages;
  genericValidation: GenericValidator;
  displayMessage: DisplayMessage = {};
  loginForm: FormGroup;
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
                  }                  
                };

                this.genericValidation = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, CustomValidators.rangeLength([6, 15])]
    })
  }

  ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formImputElement
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(()=> {
              this.displayMessage = this.genericValidation.processarMensagens(this.loginForm);
        })
  }

  login(){
    if (this.loginForm.dirty && this.loginForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value)

      this.contaService.login(this.usuario)
         .subscribe(
           sucesso => {this.processarSucesso(sucesso)},
           falha => {this.processarFalha(falha)}
         );         
    } 
  }

  processarSucesso(response: any){
     this.loginForm.reset();
     this.errors=[];

     this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

     let toastr = this.toastr.success("Login realizado com sucesso!", "Seja bem-vindo");

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
