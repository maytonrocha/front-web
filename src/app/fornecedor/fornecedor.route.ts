import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from "./editar/editar.component";
import { ExcluirComponent } from "./excluir/excluir.component";
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { FornecedorGuard } from "./Services/fornecedor.guard";
import { FornecedorResolve } from "./Services/fornecedor.resolve";

const FornecedorRouterConfig: Routes = [
   {
     path: '', component: FornecedorAppComponent,
     children: [
       { path: 'listar-todos', component: ListaComponent },
       { path: 'excluir/:id', component: ExcluirComponent,
       resolve: {
        fornecedor: FornecedorResolve
      },
         canActivate: [FornecedorGuard],
         data: [{ claim: { name: 'Fornecedor', value: 'Excluir' }}]
      },
       { path: 'editar/:id', component: EditarComponent,
       resolve: {
            fornecedor: FornecedorResolve
          },
          canActivate: [FornecedorGuard],
          data: [{ claim: { name: 'Fornecedor', value: 'Atualizar' }}]
       },
       { path: 'adicionar-novo', component: NovoComponent, 
         canActivate: [FornecedorGuard],
         canDeactivate: [FornecedorGuard],
         data: [{ claim: { name: 'Fornecedor', value: 'Adicionar' }}]      
       },
       { path: 'detalhes/:id', component: DetalhesComponent,
       resolve: {
        fornecedor: FornecedorResolve
      } }
     ]
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(FornecedorRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class FornecedorRoutingModule{ }
