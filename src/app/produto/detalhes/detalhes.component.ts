import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Produto } from '../Models/produto';
import { ProdutoService } from '../Services/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  produto:Produto;
  imagemUrl:string=environment.imagensUrl;

  constructor(private route:ActivatedRoute) {
    this.produto = this.route.snapshot.data['produto'];
  }

  ngOnInit(): void {

  }

}
