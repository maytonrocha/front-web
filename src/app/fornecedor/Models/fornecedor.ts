import { Endereco } from "./endereco";

export class Fornecedor{
  id:string;
  nome:string;
  documento:string;
  tipoFornecedor:number;
  ativo:boolean;
  endereco:Endereco;
}
