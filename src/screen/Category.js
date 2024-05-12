import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CatList } from "../trash/CatList";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailNav } from "./Detail";
import { CatProdList } from "../component/CatProdList";
import { ProdList } from "../component/ProdList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../redux/catSlice";
import { ImageButton } from "../component/imageButton";

const Stack = createStackNavigator();

export const Category = ({ navigation }) => {
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const cartNavigation = () => {
    navigation.navigate("Cart");
  };
  const userNavigation = () => {
    navigation.navigate("Login");
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatProduct"
        component={ProdList}
        // initialParams={{ selectedCategory }}
        options={{
          headerShown: true,
          title: selectedCategory,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <ImageButton icon="cart-outline" fun={cartNavigation} />
              <ImageButton icon="person-outline" fun={userNavigation} />
            </View>
          ),
          headerTintColor: "navy",
          headerLeft: () => (
            <ImageButton
              icon="menu-outline"
              fun={() => navigation.openDrawer()}
            />
          ),
        }}
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
