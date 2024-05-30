import { FlatList, Text, View, StyleSheet } from "react-native";
import { ImageButton } from "../imageButton";
import { useState } from "react";

export const orderList = (orders, text) => {
  const [toggle, setIstoggle] = useState(true);
  return (
    <View>
      <Pressable onPress={() => setIstoggle(!toggle)}>
        <Text style={styles.titleText}>{text}</Text>
      </Pressable>
      {toggle ? null : (
        <FlatList
          style={styles.list}
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.product}>
                <View>
                  <View>
                    <Text style={styles.title}>order number: {item.id} </Text>
                  </View>
                </View>
              </View>
              <View style={styles.button}>
                <Text style={styles.price}>Price: ${item.total_price}</Text>
                <Text style={styles.price}>
                  Number of Items: {item.item_numbers}
                </Text>
              </View>

              <View style={styles.line} />
              <View>
                <ImageButton
                  icon={"card-outline"}
                  label="Check Out"
                  color={"green"}
                />
              </View>
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
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-around",
  },

  heading: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: 100,
    height: 100,
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
  list: { height: "50%" },
  item: {
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 15,
    marginVertical: 5,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "red",
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
