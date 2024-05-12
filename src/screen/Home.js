import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProdList } from "../component/ProdList";
import { DetailNav } from "./Detail";
import { ShoppingCart } from "../component/ShoppingCart";
import { Checkout } from "../component/Checkout";

export const Home = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={ProdList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
