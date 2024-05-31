import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { ImageButton } from "../imageButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const OrderList = ({ order, text }) => {
  const [toggle, setToggle] = useState(true); // Changed to a more conventional name
  const items = JSON.parse(order);
  console.log("inlist", items);
  return (
    <View>
      <Pressable onPress={() => setToggle(!toggle)}>
        <Text style={styles.titleText}>
          Order number: {text}
          {toggle && <Ionicons name="chevron-expand-outline" size={22} />}
        </Text>
      </Pressable>

      {toggle ? null : (
        <FlatList
          data={items}
          keyExtractor={items.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.product}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.button}>
                <Text style={styles.price}>
                  Price: ${item.price.toFixed(2)}
                </Text>
                <Text style={styles.price}>Qty: {item.qty}</Text>
              </View>
              <Text style={styles.subtotal}>
                SubTotal: ${(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  bottom: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    borderTopWidth: 1,
  },
  line: {
    height: 2.5,
    width: "100%",
    backgroundColor: "black",
  },
  list: {},
  item: {
    backgroundColor: "lightgrey",
    borderRadius: 15,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    width: 250,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
    flexDirection: "column",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
  },
});
