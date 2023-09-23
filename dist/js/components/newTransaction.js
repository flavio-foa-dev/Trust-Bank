import { TipoTransacao } from "../types/transaction.js";
import BankAccount from "./account.js";
import { updateBalance } from "./balance.js";
const transactions = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
function getGroupOfTransactions() {
    const groupTransactions = [];
    const listTrasctions = structuredClone(transactions);
    const OrderTransactions = listTrasctions.sort((a, b) => b.data.getTime() - a.data.getTime());
    let labelAtual = "";
    for (let value of OrderTransactions) {
        let labelgroup = value.data
            .toLocaleDateString("pt-br", {
            month: "long",
            year: "numeric"
        });
        if (labelAtual !== labelgroup) {
            labelAtual = labelgroup;
            groupTransactions.push({
                label: labelgroup,
                transactions: []
            });
        }
        groupTransactions.at(-1).transactions.push();
    }
    return groupTransactions;
}
getGroupOfTransactions();
const elementForm = document.querySelector('.block-nova-transacao form');
elementForm.addEventListener("submit", function (e) {
    try {
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
        let data = new Date(inputData.value + " 00:00:00");
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
                novaTransacao.valor *= -1;
            }
            else {
                throw new Error("Tipo de Transação é inválido!");
            }
        }
        transactions.push(novaTransacao);
        setTransaction();
        console.log("transactions", getGroupOfTransactions());
        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateBalance();
        elementForm.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
