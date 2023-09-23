import { TipoTransacao, Transacao } from "../types/transaction.js"
import { GroupTransactions } from "../types/transactionsGroup.js";
import BankAccount from "./account.js"
import { updateBalance } from "./balance.js"

const transactions: Transacao[] = JSON.parse(localStorage.getItem('transactions'), (key: string, value: string) => {
  if (key === "data") {
    return new Date(value)
  }
  return value
}) || [];


function getGroupOfTransactions(): GroupTransactions[] {
  const groupTransactions : GroupTransactions[] = []
  const listTrasctions: Transacao[] = structuredClone(transactions)
  const OrderTransactions: Transacao[] = listTrasctions.sort((a, b)=> b.data.getTime() - a.data.getTime())
  let labelAtual : string = ""

  for(let value of OrderTransactions) {
    let labelgroup: string = value.data
      .toLocaleDateString("pt-br", {
          month: "long",
          year: "numeric"
        }
      )
      if(labelAtual  !== labelgroup) {
        labelAtual = labelgroup
        groupTransactions.push({
          label: labelgroup,
          transactions: []
        })
      }
      groupTransactions.at(-1).transactions.push()
  }

  return groupTransactions
}
getGroupOfTransactions()


const elementForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement
elementForm.addEventListener("submit", function(e){

  try {

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
    let data: Date = new Date(inputData.value + " 00:00:00")

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
        novaTransacao.valor *= -1
        }
      else {
        throw new Error("Tipo de Transação é inválido!");
      }
    }
    transactions.push(novaTransacao)
    setTransaction()
    console.log("transactions",getGroupOfTransactions())
    localStorage.setItem('transactions', JSON.stringify(transactions))
    updateBalance()
    elementForm.reset()

  } catch (error) {
    alert(error.message)
    }
})