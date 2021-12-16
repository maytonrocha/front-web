import { Endereco } from "./endereco";

export interface Fornecedor{
  id:string;
  nome:string;
  documento:string;
  tipoFornecedor:number;
  ativo:boolean;
  endereco:Endereco;
}
