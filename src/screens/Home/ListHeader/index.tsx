import { ScrollView, Text, View } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { TransactionCard } from "./TransactionCard";
import { TransactionTypes } from "@/shared/enums/TransactionTypes";
import { useTransactionContext } from "@/Context/transaction.context";

export const ListHeader = () => {
  const { totalTransactions } = useTransactionContext();
  return (
    <>
      <AppHeader />
      <View className="h-[150px] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <TransactionCard
            type={TransactionTypes.REVENUE}
            amount={totalTransactions.revenue}
          />
          <TransactionCard
            type={TransactionTypes.EXPENSE}
            amount={totalTransactions.expense}
          />
          <TransactionCard type={"total"} amount={totalTransactions.total} />
        </ScrollView>
      </View>
    </>
  );
};
