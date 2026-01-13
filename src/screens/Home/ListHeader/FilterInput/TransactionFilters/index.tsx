import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/Context/bottomsheet.context";
import { DateFilter } from "../DateFilter";
import { CategoryFilter } from "./CategoryFilter";
import { TypeFilter } from "./CategoryFilter/TypeFilter";
import { AppButton } from "@/components/AppButton";
import { useTransactionContext } from "@/Context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export const TransactionFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { fetchTransactions, handleLoadings, resetFilter } =
    useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao aplicar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  const handleResetFilters = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await resetFilter();
    } catch (error) {
      handleError(error, "Falha ao limpar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  return (
    <View className="flex-1 bg-gray[1000] p-6">
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-white text-xl mb-5">
          Filtrar Transações
        </Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>
      <DateFilter />
      <CategoryFilter />
      <TypeFilter />

      <View className="flex-row gap-4 mt-8">
        <AppButton
          onPress={handleResetFilters}
          className="flex-1"
          widthFull={false}
          mode="outline"
        >
          Limpar Filtros
        </AppButton>
        <AppButton
          onPress={handleFetchTransactions}
          className="flex-1"
          widthFull={false}
        >
          Filtrar
        </AppButton>
      </View>
    </View>
  );
};
