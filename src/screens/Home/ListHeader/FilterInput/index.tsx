import { useTransactionContext } from "@/Context/transaction.context";
import { colors } from "@/shared/colors";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const FilterInput = () => {
  const { pagination } = useTransactionContext();
  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center mt-4 mb-3">
        <Text className="text-white text-xl font-bold">Transações</Text>
        <Text className="text-gray-700 text-base ">
          {pagination.totalRows} {pagination.totalRows === 1 ? "Item" : "Items"}
        </Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput
          className="pl-4 w-full bg-background-primary text-lg text-white h-[50]"
          placeholderTextColor={colors.gray[600]}
          placeholder="Busque uma transação"
        />
        <TouchableOpacity className="absolute right-0">
          <MaterialIcons
            className="mr-3"
            name="filter-list"
            size={26}
            color={colors["accent-brand-light"]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
