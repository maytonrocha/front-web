import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { CurrencyUtils } from 'src/app/Utils/currency-utils';
//import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { environment } from 'src/environments/environment';
//import { Fornecedor, Produto } from '../Models/produto';
import { ProdutoFormBase } from '../Services/produto-form.base.component';
import { ProdutoService } from '../Services/produto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoFormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imagens: string = environment.imagensUrl;

  imageOriginalSrc:string;

  imageBase64:any;
  imagePreview:any;
  imageName:string;

  //produto:Produto;
  //fornecedores:Fornecedor[];
  errors:any[]=[];
  //produtoForm: FormGroup;
  imagemUrl:string=environment.imagensUrl;

  //validationMessages: ValidationMessages;
  //genericValidator: GenericValidator;
  //displayMessage: DisplayMessage = {};

  //MASKS = utilsBr.MASKS;
  //formResult: string = '';

  //mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
              private produtoService:ProdutoService,
              private router:Router,
              private route:ActivatedRoute,
              private toast:ToastrService) {
                super();

                /*this.validationMessages = {
                  fornecedorId: {
                    required: 'Escolha um fornecedor',
                  },
                  nome: {
                    required: 'Informe o Nome',
                    minlength: 'Mínimo de 2 caracteres',
                    maxlength: 'Máximo de 200 caracteres'
                  },
                  descricao: {
                    required: 'Informe a Descrição',
                    minlength: 'Mínimo de 2 caracteres',
                    maxlength: 'Máximo de 1000 caracteres'
                  },
                  imagem: {
                    required: 'Informe a Imagem',
                  },
                  valor: {
                    required: 'Informe o Valor',
                  }
                };*/

                //this.genericValidator = new GenericValidator(this.validationMessages);
                this.produto = this.route.snapshot.data['produto'];
              }
  ngAfterViewInit(): void {
    super.configurarValidacaoFormulariBase(this.formInputElements, this.produtoForm);
    //this.configurarElementosValidacao();
  }

  ngOnInit(): void {
    this.produtoService.ObterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores
      );

      this.produtoForm = this.fb.group({
        fornecedorId: ['', [Validators.required]],
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
        imagem: [''],
        valor: ['', [Validators.required]],
        ativo: [0]
      });

      this.produtoForm.patchValue({
        fornecedorId: this.produto.fornecedorId,
        id: this.produto.id,
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        ativo: this.produto.ativo,
        valor: CurrencyUtils.DecimalParaString(this.produto.valor)
      });

      this.imageOriginalSrc = this.imagens + this.produto.imagem;
  }

  /*configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }*/

  /*validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.produtoForm);
    this.mudancasNaoSalvas = true;
  }*/

  editarProduto(){
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      if (this.imageBase64){
        this.produto.imagemUpload=this.imageBase64;
        this.produto.imagem=this.imageName;
      }

      this.produto.valor= CurrencyUtils.StringParaDecimal(this.produto.valor.toString());

     this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toast.success('Produto editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produto/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toast.error('Ocorreu um erro!', 'Opa :(');
  }

  upload(file:any){
      this.imageName=file[0].name;

      var reader = new FileReader();
      reader.onload = this.manipularReader.bind(this);
      reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt:any){
      var binaryString = readerEvt.target.result;
      this.imageBase64 = btoa(binaryString);
      this.imagePreview = "data:image/jpeg;base64," + this.imageBase64;
  }





}
