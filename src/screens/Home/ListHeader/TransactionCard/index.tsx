import { TransactionTypes } from "@/shared/enums/TransactionTypes";
import { FC } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactionContext } from "@/Context/transaction.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ICONS } from "./strategies/icon-strategy";
import { CARD_DATA } from "./strategies/card-data-strategy";

export type TransactionCardType = TransactionTypes | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
}

export const TransactionCard: FC<Props> = ({ amount, type }) => {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

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
        {type !== "total" && (
          <Text className="text-gray-700 font-normal text-sm">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction.createdAt,
                  `'Ultima ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  { locale: ptBR }
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
};
