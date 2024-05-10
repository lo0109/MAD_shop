import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ProdList } from "../component/ProdList";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailNav } from "../screen/Detail";
const Stack = createStackNavigator();

export const Product = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={ProdList}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailNav}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
