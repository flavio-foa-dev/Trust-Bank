import { TipoTransacao, Transacao } from "../types/transaction.js";

const saldo = localStorage.getItem('saldo')
let balance: number = Number(saldo)

const balanceee: Transacao[] = JSON.parse(localStorage.getItem('transactions'), (key: string, value: string) => {
  if (key === "data") {
    return new Date(value)
  }
}) || [];

export default class BankAccount {
  transaction: TipoTransacao
  date: Date
  valor: number
  constructor(newtransaction: Transacao) {
    this.transaction = newtransaction.tipoTransacao
    this.date = newtransaction.data
    this.valor = newtransaction.valor
  }

  static deposit(amount: number) {
    balance += amount;
    console.log(`Deposit of $:${amount} successful. New balance: $${balance}`);
  }

  static withdraw(amount: number) {
    if (amount <= balance) {
      balance -= amount;
      console.log(`Withdrawal of $${amount} successful. New balance: $:${balance}`);
    } else {
      throw new Error(`Withdrawal of $:${amount} failed)"Insufficient funds for withdrawal.`);
    }
  }

  static checkBalance() {
    return balance
  }

  makePayment(paymentAmount: number, payee: string) {
    if (paymentAmount <= balance) {
      balance -= paymentAmount;
      return `Payment of $${paymentAmount} to ${payee} successful. New balance: $${balance}`;
    } else {
      return "Insufficient funds for payment.";
    }
  }
}


