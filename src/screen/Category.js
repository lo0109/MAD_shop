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

export const Category = ({ navigation, route }) => {
  const category = route.params.category;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatProduct"
        component={CatProdList}
        initialParams={{ category }}
        options={{
          headerShown: true,
          title: category,
          headerRight: () => (
            <View>
              <Button
                title="login"
                onPress={() => console.log("Pressed login")}
              />
            </View>
          ),
          headerTintColor: "navy",
          headerLeft: () => (
            <Button title="Back" onPress={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="CatDetail"
        component={DetailNav}
        options={{ headerShown: true, title: category }}
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
