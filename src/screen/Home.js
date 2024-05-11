import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProdList } from "../component/ProdList";
import { DetailNav } from "./Detail";

export const Home = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={ProdList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailNav}
        options={{ headerShown: false }}
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  list: {
    padding: 10,
    width: "100%",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "red",
  },
  title: {
    width: 230,
    fontSize: 20,
    fontWeight: "bold",
    // backgroundColor: "yellow",
    flexDirection: "column",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
  },
});
