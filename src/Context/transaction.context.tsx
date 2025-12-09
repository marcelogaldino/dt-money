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

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: () => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionServices.createTransaction(transaction);
  };

  const fetchTransactions = useCallback(async () => {
    const { data } = await transactionServices.getTransactions({
      page: 1,
      perPage: 10,
    });

    console.log(data);

    setTransactions(data);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
