import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ProdList } from "../component/ProdList";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailNav } from "./Detail";
const Stack = createStackNavigator();

export const Product = (category) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={{ category }}
        component={ProdList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
