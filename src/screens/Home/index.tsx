import { useAuthContext } from "@/Context/auth.context";
import { Text, TouchableOpacity, View } from "react-native";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  const logout = async () => {
    await handleLogout();
  };

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
