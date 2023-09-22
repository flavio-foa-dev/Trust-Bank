import { TipoTransacao, Transacao } from "../types/transaction.js";

const saldo = localStorage.getItem('saldo')

const balance: Transacao[] = JSON.parse(localStorage.getItem('transactions'), (key: string, value: string) => {
  if (key === "data") {
    return new Date(value)
  }
}) || [];

export default class BankAccount {
  transaction: TipoTransacao
  date: Date
  valor: number
  balance: number
  constructor(newtransaction: Transacao) {
    this.transaction = newtransaction.tipoTransacao
    this.date = newtransaction.data
    this.valor = newtransaction.valor
  }

  deposit(amount: number) {
    this.balance += amount;
    return `Deposit of $${amount} successful. New balance: $${this.balance}`;
  }

  withdraw(amount: number) {
    if (amount <= this.balance) {
      this.balance -= amount;
      return `Withdrawal of $${amount} successful. New balance: $${this.balance}`;
    } else {
      return "Insufficient funds for withdrawal.";
    }
  }

  static checkBalance() {

    return saldo
  }

  makePayment(paymentAmount: number, payee: string) {
    if (paymentAmount <= this.balance) {
      this.balance -= paymentAmount;
      return `Payment of $${paymentAmount} to ${payee} successful. New balance: $${this.balance}`;
    } else {
      return "Insufficient funds for payment.";
    }
  }
}


