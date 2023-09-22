export type Transacao = {
  tipoTransacao: TipoTransacao;
  valor: number;
  data: Date;
}

export enum TipoTransacao {
  DEPOSITO = "Deposito",
  TRANSFERENCIA = "Transferencia",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}