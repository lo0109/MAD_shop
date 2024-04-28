import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Category } from "./src/screen/Category";
import { Product } from "./src/screen/Product";
import { Home } from "./src/screen/Home";
import { useState } from "react";
import { CatList } from "./src/component/CatList";
import { FlatList } from "react-native-gesture-handler";
import { catCom, prodCom } from "./src/component/productCom";
import { CatProdList } from "./src/component/CatProdList";
import { ProdList } from "./src/component/ProdList";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({
  navigation,
  expandedCategories,
  setExpandedCategories,
}) => {
  const toggleCategories = () => {
    setExpandedCategories(!expandedCategories);
  };

  const selectCat = (cat) => {
    // const products = prodCom();
    // const prod = products.find((p) => p.category === cat);
    navigation.navigate("Category", { category: cat });
    console.log(cat);
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
              <FlatList
                style={styles.list}
                data={catCom()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={selectCat.bind(null, item)}
                    style={styles.item}
                  >
                    <View style={styles.cat}>
                      <Text style={styles.cat}>{item}</Text>
                    </View>
                  </Pressable>
                )}
              />
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
          component={CatProdList}
          options={{
            title: "category",
            headerRight: () => (
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
