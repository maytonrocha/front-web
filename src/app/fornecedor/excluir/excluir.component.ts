import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from '../Models/fornecedor';
import { FornecedorService } from '../Services/fornecedor.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit {

  fornecedor: Fornecedor=new Fornecedor();

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private fornecedorService:FornecedorService,
              private router:Router) {
    this.fornecedor= this.route.snapshot.data['fornecedor'];
  }

  ExcluirEvento(){
    this.fornecedorService.excluirFornecedor(this.fornecedor.id)
      .subscribe(
        evento => this.sucessoExclusao(evento),
        error => this.falha()
      );
  }

  sucessoExclusao(evento:any){
const toast = this.toastr.success('Fornecedor excluido com Sucesso!', 'Good bye :D')
if (toast){
   toast.onHidden.subscribe(()=>{
     this.router.navigate(['/fornecedor/listar-todos']);
   });
}
  }

  falha(){
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

  ngOnInit(): void {

  }



}
