import { TransactionCategory } from "@/shared/interfaces/http/transaction-category-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import * as transactionServices from "@/shared/services/dt-money/transaction.service";
import { CreateTransactionInterface } from "@/shared/interfaces/http/create-transaction.interface";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  categories: TransactionCategory[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionServices.createTransaction(transaction);
  };

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
