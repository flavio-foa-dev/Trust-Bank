import { FormatoData } from "../types/formatterData.js";
export function formatarMoeda(valor) {
    return valor
        .toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
export function formatarData(data, format = FormatoData.PADRAO) {
    if (FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "2-digit",
        });
    }
    else {
        return data.toLocaleDateString("pt-br");
    }
}
export function formatarInformacoes(valor, data, formatoData) {
    const dataFormatada = formatarData(data, formatoData);
    const valorFormatado = formatarMoeda(valor);
    return `${dataFormatada} - ${valorFormatado}`;
}
