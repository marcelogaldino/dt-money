import { DimissKeyboardView } from "@/components/DimissKeyboardView"
import { Text, TextInput, TouchableOpacity, View} from "react-native"
import { LoginForm } from "./LoginForm"

export const Login = () => {
  return (
    <DimissKeyboardView >
      <View className="flex-1 w-[82%] self-center">
        <LoginForm />
      </View>
    </DimissKeyboardView>
  )
}