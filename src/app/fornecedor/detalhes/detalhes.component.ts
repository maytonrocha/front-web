import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Fornecedor } from '../Models/fornecedor';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  enderecomap;

  constructor(private route: ActivatedRoute,
              private sanitazir:DomSanitizer) {
    this.fornecedor = this.route.snapshot.data['fornecedor'];

                this.enderecomap= sanitazir.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.enderecoCompleto() + "&key=");
              }

  ngOnInit(): void {
  }

  enderecoCompleto(): string{
      return this.fornecedor.endereco.logradouro + ", " + this.fornecedor.endereco.numero + " - " +
          this.fornecedor.endereco.bairro + ", " + this.fornecedor.endereco.cidade + " - " + this.fornecedor.endereco.estado;
  }

}
