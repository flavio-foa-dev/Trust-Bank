import { TipoTransacao, Transacao } from "../types/transaction.js"


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





  elementForm.reset()
})