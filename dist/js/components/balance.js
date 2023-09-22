import { FormatoData } from "../types/formatterData.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import BankAccount from "./account.js";
const elementSaldo = document.querySelector(".valor");
const elementdataAcesso = document.querySelector(".block-saldo time");
if (elementdataAcesso != null) {
    const dataAcesso = new Date();
    elementdataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
export function updateBalance() {
    if (elementSaldo != null) {
        const saldo = BankAccount.checkBalance();
        elementSaldo.textContent = formatarMoeda(Number(saldo));
    }
}
updateBalance();
