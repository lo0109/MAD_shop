import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CatList } from "../component/CatList";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailNav } from "./Detail";
import { CatProdList } from "../component/CatProdList";
import { ProdList } from "../component/ProdList";

const Stack = createStackNavigator();

export const Category = ({ category, products }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatProduct"
        component={ProdList}
        // initialParams={{ products }}
        options={{
          // title: { category },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {},
});
