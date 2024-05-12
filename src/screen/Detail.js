import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, StyleSheet, Text, View } from "react-native";
import { ProdDetailCom } from "../component/DetailCom";
import { Ionicons } from "@expo/vector-icons";
import { Comment } from "../component/Comment";
import { ShoppingCart } from "../component/ShoppingCart";
import { useSelector } from "react-redux";
const Tabs = createBottomTabNavigator();

export const DetailNav = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const items = Object.values(cartItems);
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Product Detail"
        component={ProdDetailCom}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="information-circle-outline"
              color={color}
              size={40}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Comment"
        component={Comment}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={40}
            />
          ),
          tabBarBadge: "0" || undefined,
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart-outline" color={color} size={40} />
          ),
          tabBarBadge: totalItems || undefined,
        }}
      />
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
