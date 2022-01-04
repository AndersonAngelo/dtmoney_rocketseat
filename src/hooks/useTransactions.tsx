import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionProvideProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction : TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionProvider({ children }: TransactionProvideProps) {
  const [transactions, setTransactios] = useState<Transaction[]>([])
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactios(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput : TransactionInput) {

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt : new Date(),
    });

    const { transaction } = response.data;

    setTransactios([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}