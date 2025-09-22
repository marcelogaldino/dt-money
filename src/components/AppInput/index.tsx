import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  leftIcon?: keyof typeof MaterialIcons.glyphMap
  label?: string;
}

export const AppInput = <T extends FieldValues>({control, name, label, leftIcon, ...rest}: AppInputParams<T>) => {
  
  return(
    <Controller name={name} control={control} render={({field: {onChange, value}}) => {
      return (
        <View className="w-full">
          {
            label && <Text className="text-white">{label}</Text>
          }

          <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 py-2 px-3 h-16 ">
            <TextInput onChangeText={onChange} value={value} {...rest} placeholderTextColor={colors.gray["700"]}/>

          </TouchableOpacity>
        </View>
      )
    }} />
  )
}