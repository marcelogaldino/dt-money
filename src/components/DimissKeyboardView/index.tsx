import { FC, PropsWithChildren } from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const DimissKeyboardView: FC<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}