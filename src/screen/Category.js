import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProdList } from "../component/product/ProdList";
import { useSelector } from "react-redux";
import { ImageButton } from "../component/imageButton";
import { totalQty } from "../redux/cartSlice";

const Stack = createStackNavigator();

export const Category = ({ navigation }) => {
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const cartNavigation = () => {
    navigation.navigate("Cart");
  };
  const userNavigation = () => {
    navigation.navigate("User");
  };
  const badge = useSelector(totalQty);
  console.log("badge", badge);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatProduct"
        component={ProdList}
        // initialParams={(home = false)}
        options={{
          headerShown: true,
          title: selectedCategory,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <ImageButton
                icon="cart-outline"
                fun={cartNavigation}
                badge={badge}
              />
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
