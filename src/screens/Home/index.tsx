import { AppHeader } from "@/components/AppHeader";
import { ListHeader } from "@/components/ListHeader";
import { useAuthContext } from "@/Context/auth.context";
import { useTransactionContext } from "@/Context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  const { fetchCategories, fetchTransactions } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchCategories();
      await fetchTransactions();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  );
};
