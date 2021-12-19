import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { ProdutoAppComponent } from './produto.app.component';
import { ProdutoService } from './Services/produto.service';
import { ProdutoGuard } from './Services/produto.guard';
import { ProdutoResolve } from './Services/produto.resolve';
import { ProdutoRoutingModule } from './produto.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ListaProdutos } from '../fornecedor/produtos/lista-produtos.component';

@NgModule({
  declarations: [
    ProdutoAppComponent,
    NovoComponent,
    DetalhesComponent,
    EditarComponent,
    ExcluirComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    ImageCropperModule
  ],
  providers: [
    ProdutoGuard,
    ProdutoResolve,
    ProdutoService
  ]
})
export class ProdutoModule { }
