export interface CaixaItem {
  data: string;
  id: number;
  loja: number;
  id_users: number;
  num_doc: string;
  origem: string;
  status: boolean;
  tipo_operacao: string;
  tipo: string;
  valor: string;
  entrada: number;
  saida: number;
}

export interface Saldo {
  "Saldo do dia": number;
  "Saldo do dia anterior": number;
  "Saldo total": number;
  "entrada": number;
  "saida": number;
}

export interface RelatorioResponse {
  Caixa: CaixaItem[];
  Saldo: Saldo;
  status: number;
}