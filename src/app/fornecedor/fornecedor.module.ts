import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { NovoComponent } from './novo/novo.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { EditarComponent } from './editar/editar.component';
import { ListaComponent } from './lista/lista.component';
import { FornecedorService } from './Services/fornecedor.service';
import { FornecedorRoutingModule } from './fornecedor.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FornecedorResolve } from './Services/fornecedor.resolve';
import { FornecedorGuard } from './Services/fornecedor.guard';
import { ListaProdutos } from './produtos/lista-produtos.component';

@NgModule({
  declarations: [
    FornecedorAppComponent,
    DetalhesComponent,
    NovoComponent,
    ExcluirComponent,
    EditarComponent,
    ListaComponent,
    ListaProdutos
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    FornecedorService,
    FornecedorResolve,
    FornecedorGuard
  ]
})
export class FornecedorModule { }
