import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, StyleSheet, Text, View } from "react-native";
import { Order } from "./Order";
import { ProdDetailCom } from "../component/DetailCom";

const Tabs = createBottomTabNavigator();

export const DetailNav = ({ route }) => {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Product Detail"
        component={ProdDetailCom}
        initialParams={{ prod: route.params.prod }}
      />
      <Tabs.Screen name="Order" component={Order} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
