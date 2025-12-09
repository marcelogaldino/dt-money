import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useAuthContext } from "@/Context/auth.context";
import { useBottomSheetContext } from "@/Context/bottomsheet.context";
import { NewTransaction } from "../NewTransaction";

const imgLogo = require("@/assets/Logo.png");

export const AppHeader = () => {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <View className="flex-row p-8 items-center justify-between w-full">
      <View>
        <Image
          source={imgLogo}
          className="w-[130px] h-[30px]"
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={16} color={colors.gray["700"]} />
          <Text
            className="text-base text-gray-700"
            style={{ fontFamily: "Roboto_400Regular" }}
          >
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-accent-brand w-[130px] h-[50px] rounded-xl items-center justify-center"
        onPress={() => {
          openBottomSheet(<NewTransaction />, 0);
        }}
        activeOpacity={0.8}
      >
        <Text className="text-sm text-white font-bold">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
