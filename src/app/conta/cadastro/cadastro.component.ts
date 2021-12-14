import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { Usuario } from '../Models/usuario';
import { ContaService } from '../Services/conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  validationMessages: ValidationMessages;
  genericValidation: GenericValidator;
  displayMessage: DisplayMessage = {};
  cadastroForm: FormGroup;
  usuario: Usuario;

  constructor(private fb:FormBuilder,
              private contaService:ContaService) { 
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
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  adicionarConta(){
    if (this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
      this.contaService.registrarUsuario(this.usuario);
    }
  }

}
