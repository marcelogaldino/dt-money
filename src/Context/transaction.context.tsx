import { TransactionCategory } from "@/shared/interfaces/http/transaction-category-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import * as transactionServices from "@/shared/services/dt-money/transaction.service";
import { CreateTransactionInterface } from "@/shared/interfaces/http/create-transaction.interface";
import { Transaction } from "@/shared/interfaces/transaction.interface";
import { TotalTransactions } from "@/shared/interfaces/total-transactions.interface";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    }
  );

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionServices.createTransaction(transaction);
  };

  const fetchTransactions = useCallback(async () => {
    const { data, totalTransactions } =
      await transactionServices.getTransactions({
        page: 1,
        perPage: 10,
      });

    console.log(data);

    setTransactions(data);
    setTotalTransactions(totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
