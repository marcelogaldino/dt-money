import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/TransactionTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionCardType } from "..";

interface IconData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export const ICONS: Record<TransactionCardType, IconData> = {
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
