
import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../Models/fornecedor';
import { FornecedorService } from '../Services/fornecedor.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public fornecedores: Fornecedor[];
  errorMessage:string;

  constructor(private fornecedorService:FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.obterTodos()
    .subscribe(
      fornecedor => this.fornecedores = fornecedor,
      error => this.errorMessage
    )
  }

}
