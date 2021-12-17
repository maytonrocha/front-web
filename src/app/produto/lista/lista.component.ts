import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../Models/produto';
import { ProdutoService } from '../Services/produto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  public produtos: Produto[];
  errorMessage:string;

  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.ObterTodos()
      .subscribe(
        produto => this.produtos = produto,
        error => this.errorMessage
      ); 
  }

}
