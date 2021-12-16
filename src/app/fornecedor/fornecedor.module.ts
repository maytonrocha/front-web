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
import { HttpClientModule } from '@angular/common/http';
import { FornecedorAppComponent } from './fornecedor.app.component';

@NgModule({
  declarations: [
    FornecedorAppComponent,
    DetalhesComponent,
    NovoComponent,
    ExcluirComponent,
    EditarComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    FornecedorService
  ]
})
export class FornecedorModule { }