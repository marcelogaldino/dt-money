import { TransactionCategory } from "@/shared/interfaces/http/transaction-category-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as transactionServices from "@/shared/services/dt-money/transaction.service";
import { CreateTransactionInterface } from "@/shared/interfaces/http/create-transaction.interface";
import { Transaction } from "@/shared/interfaces/transaction.interface";
import { TotalTransactions } from "@/shared/interfaces/total-transactions.interface";
import { UpdateTransactionInterface } from "@/shared/interfaces/http/update-transaction.interface";
import {
  Filters,
  Pagination,
} from "@/shared/interfaces/http/get-transactions-request.interface";

const filterInitialValues = {
  categoryIds: {},
  typeId: undefined,
  from: undefined,
  to: undefined,
};

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

interface HandleFiltersParams {
  key: keyof Filters;
  value: Date | Boolean | number;
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
  setSearchText: (text: string) => void;
  searchText: string;
  filters: Filters;
  handleFilters: (params: HandleFiltersParams) => void;
  handleCategoryFilter: (categoryId: number) => void;
  resetFilter: () => void;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Filters>(filterInitialValues);
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
    perPage: 3,
    totalRows: 1,
    totalPages: 0,
  });

  const categoryIds = useMemo(
    () =>
      Object.entries(filters.categoryIds)
        .filter(([key, value]) => value)
        .map(([key]) => Number(key)),
    [filters.categoryIds]
  );

  const handleFilters = ({ key, value }: HandleFiltersParams) => {
    setFilters((previousState) => ({ ...previousState, [key]: value }));
  };

  const handleCategoryFilter = (categoryId: number) => {
    setFilters((previousState) => ({
      ...previousState,
      categoryIds: {
        ...previousState.categoryIds,
        [categoryId]: !Boolean(previousState.categoryIds[categoryId]),
      },
    }));
  };

  const handleLoadings = ({ key, value }: HandleLoadingParams) =>
    setLoadings((prevState) => ({ ...prevState, [key]: value }));

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;
    const { data, totalTransactions, totalPages, totalRows } =
      await transactionServices.getTransactions({
        page: 1,
        perPage: page * perPage,
        ...filters,
        categoryIds,
      });

    setTransactions(data);
    setTotalTransactions(totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages,
      totalRows,
    });
  }, [pagination, filters, categoryIds]);

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
    await fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionParams) => {
      const { data, totalTransactions, totalRows, totalPages } =
        await transactionServices.getTransactions({
          page,
          perPage: pagination.perPage,
          searchText,
          ...filters,
          categoryIds,
        });

      if (page === 1) {
        setTransactions(data);
      } else {
        setTransactions((prevState) => {
          const existingIds = new Set(prevState.map((t) => t.id));
          const newTransactions = data.filter((t) => !existingIds.has(t.id));
          return [...prevState, ...newTransactions];
        });
      }

      setTotalTransactions(totalTransactions);
      setPagination((prevPagination) => ({
        ...prevPagination,
        page,
        totalRows,
        totalPages,
      }));
    },
    [pagination.perPage, searchText, filters, categoryIds]
  );

  const resetFilter = useCallback(async () => {
    setFilters(filterInitialValues);
    setSearchText("");

    const { data, totalTransactions, totalRows, totalPages } =
      await transactionServices.getTransactions({
        page: 1,
        perPage: pagination.perPage,
        searchText: "",
        categoryIds: [],
      });

    setTransactions(data);
    setTotalTransactions(totalTransactions);
    setPagination({ ...pagination, page: 1, totalPages, totalRows });
  }, []);

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
        setSearchText,
        searchText,
        filters,
        handleFilters,
        handleCategoryFilter,
        resetFilter,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
