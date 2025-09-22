import { Home } from "@/screens/Home";
import { createStackNavigator } from "@react-navigation/stack"

export type PrivateStackParamsList = {
  Home: undefined;
}

export const PrivateRoutes = () => {
  const PrivateRoutes = createStackNavigator<PrivateStackParamsList>()
  return (
    <PrivateRoutes.Navigator >
      <PrivateRoutes.Screen name="Home" component={Home}/>
    </PrivateRoutes.Navigator>
  )
}