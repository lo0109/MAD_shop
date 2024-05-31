import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Category } from "../screen/Category";
import { Home } from "../screen/Home";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { ImageButton } from "./imageButton";
import {
  loadCatData,
  setSelectedCategory,
  showCategory,
} from "../redux/catSlice";
import { Cart } from "../screen/Cart";
import { useNavigation } from "@react-navigation/native";
import { User } from "../screen/User";
import { UserProfile } from "../screen/UserPage";
import { totalQty } from "../redux/cartSlice";
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
    // navigation.setOptions({ title: category });
    dispatch(setSelectedCategory(category));
    navigation.navigate("Category");

    // navigation.closeDrawer();
  };

  return (
    <View style={styles.drawer}>
      <View>
        <View style={styles.border}>
          <Pressable
            onPress={() => (
              navigation.navigate("Product"), dispatch(setSelectedCategory())
            )}
          >
            <Text style={styles.drawerContent}>Home</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={toggleCategories}>
            <Text style={styles.drawerContent}>Categories</Text>
            {expandedCategories && (
              <View style={{ marginLeft: 20, height: 300 }}>
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
                <Text>Developed by Siu Wai Lo</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <View style={styles.drawerbottom}>
        {/* <Pressable onPress={() => navigation.navigate("Cart")}>
          <Text
            style={[
              styles.drawerContent,
              { color: "green", textAlign: "center" },
            ]}
          >
            Shopping Cart
          </Text>
        </Pressable> */}

        <Pressable onPress={() => navigation.navigate("User")}>
          <Text
            style={[
              styles.drawerContent,
              { color: "green", textAlign: "center" },
            ]}
          >
            User login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const DrawerNavigatorContainer = () => {
  const navigation = useNavigation();
  const [expandedCategories, setExpandedCategories] = useState(false);
  const cartNavigation = () => {
    navigation.navigate("Cart");
  };
  const userNavigation = () => {
    navigation.navigate("User");
  };
  const badge = useSelector(totalQty);
  return (
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
        name="Fake Store"
        component={Home}
        options={{
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
        }}
      />
      <Drawer.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <ImageButton icon="cart-outline" />
              <ImageButton icon="person-outline" />
            </View>
          ),
        }}
      /> */}
      <Drawer.Screen
        name="User"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: "cover",
  },
  drawer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 50,
    marginBottom: 50,
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
  drawerbottom: {
    borderColor: "navy",
    borderBottomWidth: 1,
    borderTopWidth: 1,
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
