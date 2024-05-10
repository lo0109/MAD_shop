import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CatList } from "../trash/CatList";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailNav } from "./Detail";
import { CatProdList } from "../component/CatProdList";
import { ProdList } from "../component/ProdList";

const Stack = createStackNavigator();

export const Category = ({ route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatProduct"
        component={CatProdList}
        initialParams={{ category: route.params.category }}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CatDetail"
        component={DetailNav}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {},
});
