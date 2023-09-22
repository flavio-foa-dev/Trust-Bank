import { TipoTransacao, Transacao } from "../types/transaction.js"
import BankAccount from "./account.js"
import { updateBalance } from "./balance.js"


const elementForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement
elementForm.addEventListener("submit", function(e){
  e.preventDefault()
  if(!elementForm.checkValidity()){
    alert("Preencha todos os tados da Operacao")
    return
  }

  const inputTipoTransacao = elementForm.querySelector("#tipoTransacao") as HTMLSelectElement
  const inputValor = elementForm.querySelector("#valor")as HTMLInputElement
  const inputData = elementForm.querySelector("#data") as HTMLDataElement



  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao
  let valor: number = Number(inputValor.valueAsNumber)
  let data: Date = new Date(inputData.value)

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  }

  function setTransaction(): void {
    if (tipoTransacao === TipoTransacao.DEPOSITO) {
      BankAccount.deposit(valor)
    } else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
      BankAccount.withdraw(valor)
      }
    else {
      throw new Error("Tipo de Transação é inválido!");
    }
  }
  setTransaction()
  updateBalance()





  elementForm.reset()
})