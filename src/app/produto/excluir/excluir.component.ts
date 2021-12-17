import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../Models/produto';
import { ProdutoService } from '../Services/produto.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit {

  produto:Produto;

  constructor(private ProdutoService:ProdutoService,
              private route:ActivatedRoute,
              private router:Router,
              private toast: ToastrService) { 
                this.produto = this.route.snapshot.data['produto'];
              }

  ngOnInit(): void {  }

  excluirProduto(){
    this.ProdutoService.excluirProduto(this.produto.id)
       .subscribe(
        sucesso => this.sucessoExclusao(sucesso),
        () => this.falha()
       );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toast.success('Produto excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produto/listar-todos']);
      });
    }
  }

  public falha() {
    this.toast.error('Houve um erro no processamento!', 'Ops! :(');
  }

}
