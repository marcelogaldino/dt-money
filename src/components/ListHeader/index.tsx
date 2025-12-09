import { ScrollView, Text, View } from "react-native";
import { AppHeader } from "../AppHeader";

export const ListHeader = () => {
  return (
    <>
      <AppHeader />
      <View className="h-[150px] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
          <Text>Teste</Text>
        </ScrollView>
      </View>
    </>
  );
};
