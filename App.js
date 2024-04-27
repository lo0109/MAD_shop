import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Category } from "./src/screen/Category";
import { Product } from "./src/screen/Product";
import { Home } from "./src/screen/Home";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: (tintColor) => (
              <View>
                <Button
                  title="Cart"
                  onPress={() => console.log("Pressed Cart")}
                />
              </View>
            ),
            headerTintColor: "navy",
          }}
        />
        <Drawer.Screen
          name="Category"
          component={Category}
          options={{
            title: "Categories",
            headerRight: (tintColor) => (
              <View>
                <Button
                  title="Cart"
                  onPress={() => console.log("Pressed Cart")}
                />
              </View>
            ),
            headerTintColor: "navy",
          }}
        />
        <Drawer.Screen
          name="Product"
          component={Product}
          options={{
            title: "Product",
            headerRight: (tintColor) => (
              <View>
                <Button
                  title="Cart"
                  onPress={() => console.log("Pressed Cart")}
                />
              </View>
            ),
            headerTintColor: "navy",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "cover",
  },
});
