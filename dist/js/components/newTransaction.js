import { TipoTransacao } from "../types/transaction.js";
import BankAccount from "./account.js";
import { updateBalance } from "./balance.js";
const elementForm = document.querySelector('.block-nova-transacao form');
elementForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!elementForm.checkValidity()) {
        alert("Preencha todos os tados da Operacao");
        return;
    }
    const inputTipoTransacao = elementForm.querySelector("#tipoTransacao");
    const inputValor = elementForm.querySelector("#valor");
    const inputData = elementForm.querySelector("#data");
    let tipoTransacao = inputTipoTransacao.value;
    let valor = Number(inputValor.valueAsNumber);
    let data = new Date(inputData.value);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    function setTransaction() {
        if (tipoTransacao === TipoTransacao.DEPOSITO) {
            BankAccount.deposit(valor);
        }
        else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            BankAccount.withdraw(valor);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
    }
    setTransaction();
    updateBalance();
    elementForm.reset();
});
