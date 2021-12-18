import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { CurrencyUtils } from 'src/app/Utils/currency-utils';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Utils/generic-form-validation';
import { Fornecedor, Produto } from '../Models/produto';
import { ProdutoService } from '../Services/produto.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation=0;
  rotation=0;
  scale=1;
  showCropper:boolean=false;
  containWithAspectRation=false;
  transform:ImageTransform={};
  ImagemName: string;
  ImageUrl:string;

  mudancasNaoSalvas:boolean;
  errors:any[]=[];
  //MASKS = utilsBr.MASKS;
  produto: Produto;
  fornecedores: Fornecedor[];
  formResult: string = '';
  produtoForm: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
              private produtoService:ProdutoService,
              private router:Router,
              private toast:ToastrService) {

             this.validationMessages = {
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

                this.genericValidator = new GenericValidator(this.validationMessages);
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
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    this.configurarElementosValidacao();
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.produtoForm);
    this.mudancasNaoSalvas = true;
  }

  adicionarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {

      this.produto = Object.assign({}, this.produto, this.produtoForm.value);
      this.formResult = JSON.stringify(this.produto);

      this.produto.imagemUpload=this.croppedImage.split(',')[1];
      this.produto.imagem=this.ImagemName;
      this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor.toString());

      //this.produto.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      //this.produto.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
      //this.produto.tipoFornecedor = parseInt(this.fornecedor.tipoFornecedor.toString());

      this.produtoService.novoProduto(this.produto)
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

    this.mudancasNaoSalvas = false;

    let toast = this.toast.success('Produto cadastrado com sucesso!', 'Sucesso!');
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.ImagemName=event.currentTarget.files[0].name;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded() {
    this.showCropper=true;
}
cropperReady(sourceImageDimensions: Dimensions) {
    console.log('cropper Ready ' + sourceImageDimensions);
}
loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.ImagemName+ ' não é aceito');
}
}
