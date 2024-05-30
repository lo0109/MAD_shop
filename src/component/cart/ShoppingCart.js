import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, Alert } from "react-native";
import { ImageButton } from "../imageButton";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItems,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  totalCart,
} from "../../redux/cartSlice";
import { useIsFocused } from "@react-navigation/native";
import { updateCart } from "../../service/cartService";
import { authToken, userID } from "../../redux/loginSlice";
import { addItemToOrder } from "../../redux/orderSlice";
import { checkOut } from "../../service/checkoutService";

export const ShoppingCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  const items = useSelector(cartItems);
  const uID = useSelector(userID);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && !uID) {
      Alert.alert("Please login to see the Shopping Cart.");
      navigation.navigate("User");
    }
  }, [isFocused]);

  useEffect(() => {
    updateCart({ token, items });
  }, [items]);

  const total = useSelector(totalCart);

  const decreaseHandler = (id, qty, title) => {
    if (qty > 1) {
      dispatch(decreaseQuantity({ id }));
    } else {
      Alert.alert("Remove Item", `Are you sure you want to remove ${title}?`, [
        { text: "Cancel" },
        {
          text: "Confirm",
          onPress: () => {
            dispatch(removeItem({ id }));
          },
        },
      ]);
    }
  };

  const deleteHandler = (id, title) => {
    Alert.alert("Remove Item", `Are you sure you want to remove ${title}?`, [
      { text: "Cancel" },
      {
        text: "Confirm",
        onPress: () => {
          dispatch(removeItem({ id }));
        },
      },
    ]);
  };

  const checkoutHandler = async () => {
    try {
      const data = await checkOut({
        token,
        items,
      });
      console.log("inside handler", data);
      if (data.status === "OK") {
        const orderId = data.id;
        dispatch(clearCart());
        dispatch(
          addItemToOrder({
            id: orderId,
            order: items,
            isPaid: 0,
            isDelivered: 0,
          })
        );
        Alert.alert("Checkout successfully.");
      } else {
        Alert.alert("Checkout data failed.", data.message);
      }
    } catch (e) {
      Alert.alert("Checkout failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.heading}>
          <Text style={styles.titleText}>Shopping Cart</Text>
        </View>
        <View style={styles.line} />
        <View>
          {total > 0 ? (
            <FlatList
              style={styles.list}
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.price}>Price: ${item.price}</Text>
                    <Text style={styles.price}>Qty: {item.qty}</Text>
                  </View>
                  <Text style={styles.subtotal}>
                    SubTotal: ${item.price * item.qty}
                  </Text>
                  <View style={styles.line} />
                  <View style={styles.button}>
                    <ImageButton
                      icon={"add-circle-outline"}
                      fun={() => dispatch(increaseQuantity({ id: item.id }))}
                      color={"green"}
                    />
                    <ImageButton
                      icon={"remove-circle-outline"}
                      fun={() => decreaseHandler(item.id, item.qty, item.title)}
                      color={"red"}
                    />
                    <ImageButton
                      icon={"trash-outline"}
                      fun={() => deleteHandler(item.id, item.title)}
                    />
                  </View>
                </View>
              )}
            />
          ) : (
            <View style={styles.list}>
              <Text style={styles.titleText}>No items in the cart</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.titleText}> Total: ${total}</Text>
        <ImageButton
          label="Checkout"
          icon={"card-outline"}
          fun={() => checkoutHandler()}
          color={"green"}
        />
      </View>
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
  list: {
    height: "90%",
  },
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

export default ShoppingCart;
