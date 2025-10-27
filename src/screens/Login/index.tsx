import { DimissKeyboardView } from "@/components/DimissKeyboardView";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "@/components/AuthHeader";
import { useAuthContext } from "@/Context/auth.context";

export const Login = () => {
  const { user } = useAuthContext();

  return (
    <DimissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DimissKeyboardView>
  );
};
