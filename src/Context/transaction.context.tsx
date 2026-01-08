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
import { UpdateTransactionInterface } from "@/shared/interfaces/http/update-transaction.interface";
import { Pagination } from "@/shared/interfaces/http/get-transactions-request.interface";

interface FetchTransactionParams {
  page: number;
}

interface Loadings {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
}

interface HandleLoadingParams {
  key: keyof Loadings;
  value: boolean;
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: (params: FetchTransactionParams) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  loadMoreTransactions: () => Promise<void>;
  loadings: Loadings;
  handleLoadings: (params: HandleLoadingParams) => void;
  pagination: Pagination;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    loadMore: false,
    refresh: false,
  });
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    }
  );

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 4,
    totalRows: 1,
    totalPages: 0,
  });

  const handleLoadings = ({ key, value }: HandleLoadingParams) =>
    setLoadings((prevState) => ({ ...prevState, [key]: value }));

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;
    const { data, totalTransactions, totalPages, totalRows } =
      await transactionServices.getTransactions({
        page: 1,
        perPage: page * perPage,
      });

    setTransactions(data);
    setTotalTransactions(totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages,
      totalRows,
    });
  }, [pagination]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionServices.createTransaction(transaction);
    refreshTransactions();
  };

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await transactionServices.updateTransaction(transaction);
    refreshTransactions();
  };

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionParams) => {
      const { data, totalTransactions, totalRows, totalPages } =
        await transactionServices.getTransactions({
          page,
          perPage: pagination.perPage,
        });

      if (page === 1) {
        setTransactions(data);
      } else {
        setTransactions((prevState) => [...prevState, ...data]);
      }

      setTotalTransactions(totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows,
        totalPages,
      });
    },
    [pagination]
  );

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        refreshTransactions,
        createTransaction,
        updateTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        loadMoreTransactions,
        loadings,
        handleLoadings,
        pagination,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
