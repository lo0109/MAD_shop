import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Image,
  Alert,
} from "react-native";
import { ImageButton } from "../imageButton";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  totalCart,
} from "../../redux/cartSlice";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { updateCart } from "../../service/cartService";
import { authToken, userID } from "../../redux/loginSlice";

export const ShoppingCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  const cartItems = useSelector(cartItem);
  const uID = useSelector(userID);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus && !uID) {
      Alert.alert("Please login to see the Shopping Cart.");
      navigation.navigate("User");
    }
  }, [isFocus]);

  useEffect(() => {
    updateCart({ token, items: cartItems });
  }, [cartItems]);

  const items = Object.values(cartItems);
  // const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = useSelector(totalCart);
  const decreaseHandler = (id) => {
    if (cartItems[id].qty > 1) dispatch(decreaseQuantity({ id }));
    else {
      Alert.alert(
        "Remove Item",
        `Are you sure you want to remove ${cartItems[id].title}?`,
        [
          { text: "Cancel" },
          {
            text: "Confirm",
            onPress: () => {
              dispatch(removeItem({ id }));
            },
          }, // Remove the item from the state by its ID
        ]
      );
    }
  };
  const deleteHandler = (id) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${cartItems[id].title}?`,
      [
        { text: "Cancel" },
        {
          text: "Confirm",
          onPress: () => {
            dispatch(removeItem({ id }));
          },
        }, // Remove the item from the state by its ID
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.heading}>
          <Text style={styles.titleText}>Shopping Cart</Text>
        </View>
        <View>
          <View style={styles.line} />
        </View>
        <View>
          {total > 0 ? (
            <FlatList
              style={styles.list}
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </View>
                    <View>
                      <View>
                        <Text style={styles.title}>{item.title} </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.price}>Price: ${item.price}</Text>
                    <Text style={styles.price}>Qty: {item.qty}</Text>
                  </View>
                  <View>
                    <Text style={styles.subtotal}>
                      SubTotal: ${item.price * item.qty}
                    </Text>
                  </View>
                  <View style={styles.line} />
                  <View style={styles.button}>
                    <ImageButton
                      icon={"add-circle-outline"}
                      fun={() => dispatch(increaseQuantity({ id: item.id }))}
                      color={"green"}
                    />
                    <ImageButton
                      icon={"remove-circle-outline"}
                      fun={() => decreaseHandler(item.id)}
                      color={"red"}
                    />

                    <ImageButton
                      icon={"trash-outline"}
                      fun={() => deleteHandler(item.id)}
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
        <Text style={styles.titleText}> Total: {total}</Text>
        <ImageButton
          label="Checkout"
          icon={"card-outline"}
          fun={() => navigation.navigate("Checkout")}
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
  list: { height: "90%" },
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
