import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from "./editar/editar.component";
import { ExcluirComponent } from "./excluir/excluir.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { ProdutoAppComponent } from "./produto.app.component";
import { ProdutoGuard } from "./Services/produto.guard";
import { ProdutoResolve } from "./Services/produto.resolve";

const ProdutoRouteConfig: Routes = [
  {
    path: '', component: ProdutoAppComponent,
    children:[
        { path: 'adicionar-novo', component: NovoComponent,    
          canActivate: [ProdutoGuard],
          data: [{ claim: { name: 'Produto', value: 'Adicionar' }}]
        },
        { path: 'listar-todos', component: ListaComponent },
        { path: 'excluir/:id', component: ExcluirComponent,
           resolve: {
               produto: ProdutoResolve
           },
           canActivate: [ProdutoGuard],
           data: [{ claim: { name: 'Produto', value: 'Excluir' }}]
        },
        { path: 'detalhes/:id', component: DetalhesComponent,
           resolve: {
            produto: ProdutoResolve
           } 
        },
        { path: 'editar/:id', component: EditarComponent,
          resolve: {
            produto: ProdutoResolve
          },
          canActivate: [ProdutoGuard],
          data: [{ claim: { name: 'Produto', value: 'Atualizar' }}] 
        }
    ]
  }
]

@NgModule({
    imports:[
        RouterModule.forChild(ProdutoRouteConfig)
    ],
    exports:[
        RouterModule
    ]
})
export class ProdutoRoutingModule{}