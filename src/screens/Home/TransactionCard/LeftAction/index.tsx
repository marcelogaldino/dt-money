import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { Transaction } from "@/shared/interfaces/transaction.interface";
import { FC } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useBottomSheetContext } from "@/Context/bottomsheet.context";
import { EditTransactionForm } from "./EditTransactionForm";

interface Params {
  transaction: Transaction;
}

export const LeftAction: FC<Params> = ({ transaction }) => {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <Pressable
      onPress={() => {
        openBottomSheet(<EditTransactionForm transaction={transaction} />, 0);
      }}
    >
      <View className="bg-accent-blue-dark w-[82] h-[140] justify-center items-center rounded-l-[6]">
        <MaterialIcons name="edit" color={colors.white} size={30} />
      </View>
    </Pressable>
  );
};
