import { dtMoneyApi } from "@/shared/api/dt-money";
import { CreateTransactionInterface } from "@/shared/interfaces/http/create-transaction.interface";
import {
  GetTransactionsParams,
  GetTransactionsResponse,
} from "@/shared/interfaces/http/get-transactions-request.interface";
import { TransactionCategory } from "@/shared/interfaces/http/transaction-category-response";
import qs from "qs";

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories"
  );

  return data;
};

export const createTransaction = async (
  transaction: CreateTransactionInterface
) => {
  await dtMoneyApi.post("/transaction", transaction);
};

export const getTransactions = async (
  params: GetTransactionsParams
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get("/transaction", {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
  });

  return data;
};
