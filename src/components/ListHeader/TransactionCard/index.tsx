import { TransactionTypes } from "@/shared/enums/TransactionTypes";
import { FC } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

type TransactionCardType = TransactionTypes | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
}

interface IconData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

const ICONS: Record<TransactionCardType, IconData> = {
  [TransactionTypes.REVENUE]: {
    name: "arrow-circle-up",
    color: colors["accent-brand-light"],
  },
  [TransactionTypes.EXPENSE]: {
    name: "arrow-circle-down",
    color: colors["accent-red"],
  },
  total: {
    name: "attach-money",
    color: colors.white,
  },
};

interface CardData {
  label: string;
  bgColor: string;
}

const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.EXPENSE]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};

export const TransactionCard: FC<Props> = ({ amount, type }) => {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  return (
    <View
      className={`bg-${cardData.bgColor} min-w-[200] rounded-[6] px-8 py-6 justify-between mr-6`}
    >
      <View className="flex-row justify-between items-center mg-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>
      <View>
        <Text className="font-bold text-2xl text-gray-400">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
};
