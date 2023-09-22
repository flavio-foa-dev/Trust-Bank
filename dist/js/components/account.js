const saldo = localStorage.getItem('saldo');
const balance = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
}) || [];
export default class BankAccount {
    transaction;
    date;
    valor;
    balance;
    constructor(newtransaction) {
        this.transaction = newtransaction.tipoTransacao;
        this.date = newtransaction.data;
        this.valor = newtransaction.valor;
    }
    deposit(amount) {
        this.balance += amount;
        return `Deposit of $${amount} successful. New balance: $${this.balance}`;
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            return `Withdrawal of $${amount} successful. New balance: $${this.balance}`;
        }
        else {
            return "Insufficient funds for withdrawal.";
        }
    }
    static checkBalance() {
        return saldo;
    }
    makePayment(paymentAmount, payee) {
        if (paymentAmount <= this.balance) {
            this.balance -= paymentAmount;
            return `Payment of $${paymentAmount} to ${payee} successful. New balance: $${this.balance}`;
        }
        else {
            return "Insufficient funds for payment.";
        }
    }
}
