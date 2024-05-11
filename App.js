import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Category } from "./src/screen/Category";
import { Home } from "./src/screen/Home";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadCatData, showCategory } from "./src/redux/catSlice";
import store from "./src/redux/store";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({
  navigation,
  expandedCategories,
  setExpandedCategories,
}) => {
  const dispatch = useDispatch();
  const { categoryData, loading, error } = useSelector(showCategory);
  useEffect(() => {
    dispatch(loadCatData());
  }, []);

  const toggleCategories = () => {
    setExpandedCategories(!expandedCategories);
  };

  const selectCat = (category) => {
    navigation.navigate("Category", { category });
    // navigation.setOptions({ title: category });
  };

  return (
    <View style={styles.drawer}>
      <View style={styles.border}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={styles.drawerContent}>Home</Text>
        </Pressable>
      </View>
      <View style={styles.border}>
        <Pressable onPress={toggleCategories}>
          <Text style={styles.drawerContent}>Categories</Text>
          {expandedCategories && (
            <View style={{ marginLeft: 20 }}>
              {loading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : error ? (
                <Text>Error: {error}</Text>
              ) : (
                <FlatList
                  style={styles.list}
                  data={categoryData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => selectCat(item)}
                      style={styles.item}
                    >
                      <View style={styles.cat}>
                        <Text style={styles.cat}>{item}</Text>
                      </View>
                    </Pressable>
                  )}
                />
              )}
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default function App() {
  const [expandedCategories, setExpandedCategories] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              expandedCategories={expandedCategories}
              setExpandedCategories={setExpandedCategories}
            />
          )}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <View>
                  <Button
                    title="Login"
                    onPress={() => console.log("Pressed login")}
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
              headerShown: false,
              headerRight: () => (
                <View>
                  <Button
                    title="login"
                    onPress={() => console.log("Pressed login")}
                  />
                </View>
              ),
              headerTintColor: "navy",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "cover",
  },
  drawer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 50,
    padding: 10,
  },
  drawerContent: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "navy",
    width: 250,
  },
  border: {
    borderColor: "navy",
    borderBottomWidth: 1,
  },
  list: {
    padding: 10,
    width: "100%",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  cat: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
