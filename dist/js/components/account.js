const saldo = localStorage.getItem('saldo');
let balance = Number(saldo);
const balanceee = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
}) || [];
export default class BankAccount {
    transaction;
    date;
    valor;
    constructor(newtransaction) {
        this.transaction = newtransaction.tipoTransacao;
        this.date = newtransaction.data;
        this.valor = newtransaction.valor;
    }
    static deposit(amount) {
        balance += amount;
        console.log(`Deposit of $:${amount} successful. New balance: $${balance}`);
    }
    static withdraw(amount) {
        if (amount <= balance) {
            balance -= amount;
            console.log(`Withdrawal of $${amount} successful. New balance: $:${balance}`);
        }
        else {
            throw new Error(`Withdrawal of $:${amount} failed)"Insufficient funds for withdrawal.`);
        }
    }
    static checkBalance() {
        return balance;
    }
    makePayment(paymentAmount, payee) {
        if (paymentAmount <= balance) {
            balance -= paymentAmount;
            return `Payment of $${paymentAmount} to ${payee} successful. New balance: $${balance}`;
        }
        else {
            return "Insufficient funds for payment.";
        }
    }
}
