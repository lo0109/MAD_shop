import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View, StyleSheet } from "react-native";
import { loadDataAndUpdate } from "../datamodel/data";
import { catCom, prodCom } from "../component/product/productCom";
export const CatList = ({ navigation }) => {
  const products = prodCom();
  const categories = catCom();
  const selectCat = (cat) => {
    const prod = products.find((p) => p.category === cat);
    navigation.navigate("CatProduct", { prod });
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => selectCat(item)} style={styles.item}>
            <View style={styles.cat}>
              <Text style={styles.cat}>{item}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
  },
});
