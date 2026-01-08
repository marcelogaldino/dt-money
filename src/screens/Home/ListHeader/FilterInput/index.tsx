import { useTransactionContext } from "@/Context/transaction.context";
import { colors } from "@/shared/colors";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export const FilterInput = () => {
  const { pagination, setSearchText, fetchTransactions, searchText } =
    useTransactionContext();
  const [text, setText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    (async () => {
      try {
        await fetchTransactions({ page: 1 });
      } catch (error) {}
    })();
  }, [searchText]);

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
          value={text}
          onChangeText={setText}
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
