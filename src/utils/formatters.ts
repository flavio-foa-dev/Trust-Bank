import { FormatoData } from "../types/formatterData.js";

export function formatarMoeda(valor: number): string {
  return valor
  .toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function formatarData (
    data: Date,
    format: FormatoData =  FormatoData.PADRAO
  ): string {

  if(FormatoData.DIA_SEMANA_DIA_MES_ANO) {
    return data.toLocaleDateString("pt-br", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
  }

  else if(FormatoData.DIA_MES) {
    return data.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  else {
    return data.toLocaleDateString("pt-br")
  }

}


export function formatarInformacoes(valor: number, data: Date, formatoData: FormatoData): string {
  const dataFormatada = formatarData(data, formatoData);
  const valorFormatado = formatarMoeda(valor);
  return `${dataFormatada} - ${valorFormatado}`;
}

interface Produto {
  nome: string; preco: number; quantidade: number;
  }

  function calcularValorTotal<T>(produtos: T[]): number {
  let valorTotal = 0;
  for (let x = 0; x < produtos.length; x++) {
  //valorTotal += produtos[x].preco * produtos[x].quantidade;
  }
  return valorTotal;
  }

