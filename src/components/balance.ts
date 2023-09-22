import { FormatoData } from "../types/formatterData.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import BankAccount from "./account.js";


const elementSaldo = document.querySelector(".valor") as HTMLElement;
const elementdataAcesso = document.querySelector(".block-saldo time") as HTMLElement;



  if (elementdataAcesso != null) {
    const dataAcesso: Date = new Date()
    elementdataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)

  }

  export function updateBalance(): void {
    if (elementSaldo != null) {
      const saldo = BankAccount.checkBalance()
      elementSaldo.textContent = formatarMoeda(Number(saldo))

    }
  }

  updateBalance()



