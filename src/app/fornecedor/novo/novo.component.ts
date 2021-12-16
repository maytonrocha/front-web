import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgBrazilValidators } from 'ng-brazil';
//import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { StringUtils } from 'src/app/Utils/string-utils';
import { CepConsulta } from '../Models/endereco';
import { Fornecedor } from '../Models/fornecedor';
import { FornecedorService } from '../Services/fornecedor.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors:any[]=[];
  //MASKS = utilsBr.MASKS;
  fornecedor: Fornecedor = new Fornecedor();
  formResult: string = '';
  fornecedorForm: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento: string = 'CPF (requerido)';

  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
              private fornecedorService:FornecedorService,
              private router: Router,
              private toastr: ToastrService) {                 

    this.validationMessages = {
      nome:{
        required: 'Informe o nome',        
      },
      documento:{
        required: 'Informe o documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      logradouro:{
        required: 'Informe o logradouro'
      },
      numero:{
        required: 'Informe o número'
      },
      bairro:{
        required: 'Informe o bairro'
      },
      cep:{
        required: 'Informe o CEP',
        cep: 'CEP em formato invalido'
      },
      cidade:{
        required: 'Informe o cidade'
      },
      estado:{
        required: 'Informe o Estado'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
 }

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', Validators.required],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        cidade: ['', Validators.required],
        estado: ['', [Validators.required]]
      })
    })

    this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAfterViewInit(): void{
    this.configurarElementosValidacao();
    this.tipoFornecedorForm().valueChanges
      .subscribe(()=>{
        this.trocarValidacaoDocumento();
        this.configurarElementosValidacao();
        this.validarFormulario();
      })
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor');
  }

  documento(): AbstractControl {
    return this.fornecedorForm.get('documento');
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }

  trocarValidacaoDocumento() {
    if (this.tipoFornecedorForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (requerido)";
    }
    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
      this.fornecedor.tipoFornecedor = parseInt(this.fornecedor.tipoFornecedor.toString());

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedor/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  getCpfCnpjMask(): string{
    return this.tipoFornecedorForm().value == '1' ? '000.000.000-00' : '00.000.000/0000-00';
 }

}
