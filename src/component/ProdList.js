import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductData, showProduct } from "../redux/productSlice";

export const ProdList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { productData, loading, error } = useSelector(showProduct);
  useEffect(() => {
    dispatch(loadProductData());
  }, []);

  const selectProd = (id) => {
    const prod = productData.find((p) => p.id === id);
    console.log(prod.title);
    navigation.navigate("Detail", { prod });
    // navigation.setOptions({ title: prod.title });
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {!productData ? (
          <Button title="refresh" onPress={() => dispatch(loadProductData)} />
        ) : loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <FlatList
            data={productData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={selectProd.bind(null, item.id)}
                style={styles.item}
              >
                <View style={styles.detail}>
                  <View>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </View>

                  <View style={styles.description}>
                    <View>
                      <Text style={styles.title}>{item.title} </Text>
                    </View>
                    <View>
                      <Text style={styles.price}>Price: ${item.price}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
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
