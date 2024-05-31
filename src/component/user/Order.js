import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authToken, userID } from "../../redux/loginSlice";
import { ImageButton } from "../imageButton";
import {
  fillOrderFromFetch,
  orderRecord,
  payOrder,
  payOrderToSever,
  recOrderToSever,
  receiveOrder,
} from "../../redux/orderSlice";
import { fillCartFromFetch } from "../../redux/cartSlice";
import { OrderList } from "./orderList";
import { updateOrder } from "../../service/orderService";
export const OrderRecord = ({ navigation }) => {
  const isFocus = useIsFocused();
  const uID = useSelector(userID);
  const token = useSelector(authToken);
  const [togglepay, setIstogglepay] = useState(true);
  const [togglerec, setIstogglerec] = useState(true);
  const [togglecom, setIstogglecom] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector(orderRecord);
  const keyExtractor = (item) => item.id.toString();
  useEffect(() => {
    if (isFocus && !uID) {
      Alert.alert("Please login to see the Order.");
      navigation.goBack();
    } else {
      dispatch(fillOrderFromFetch(token));
    }
  }, [isFocus]);

  return (
    <View>
      <Text style={styles.title}>Your Order Record</Text>
      <View
        style={(styles.item, { backgroundColor: "orange", borderRadius: 15 })}
      >
        <Pressable
          onPress={() => {
            setIstogglepay(!togglepay);
            setIstogglecom(true);
            setIstogglerec(true);
          }}
        >
          <Text style={styles.titleText}>Pending payment</Text>
        </Pressable>
        {!togglepay && (
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={keyExtractor}
            renderItem={({ item }) =>
              item.is_paid == 0 ? (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View></View>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.price}>Total: ${item.total_price}</Text>
                    <Text style={styles.price}>
                      Number of Items: {item.item_numbers}
                    </Text>
                  </View>
                  <View>
                    <ImageButton
                      icon={"card-outline"}
                      label="Check Out"
                      color={"green"}
                      fun={() => {
                        dispatch(payOrderToSever({ token, id: item.id }));
                        // payOrdehandler({
                        //   item: JSON.parse(item.order_items),
                        //   id: item.id,
                        // });
                      }}
                    />
                  </View>
                  <View style={styles.line} />
                  <View>
                    <OrderList order={item.order_items} text={item.id} />
                  </View>
                </View>
              ) : null
            }
          />
        )}
      </View>

      <View
        style={(styles.item, { backgroundColor: "yellow", borderRadius: 15 })}
      >
        <Pressable
          onPress={() => {
            setIstogglerec(!togglerec);
            setIstogglecom(true);
            setIstogglepay(true);
          }}
        >
          <Text style={styles.titleText}>Pending received</Text>
        </Pressable>
        {!togglerec && (
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={keyExtractor}
            renderItem={({ item }) =>
              item.is_paid == 1 && item.is_delivered == 0 ? (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View>
                      <View></View>
                    </View>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.price}>Price: ${item.total_price}</Text>
                    <Text style={styles.price}>
                      Number of Items: {item.item_numbers}
                    </Text>
                  </View>

                  <View>
                    <ImageButton
                      icon={"checkbox-outline"}
                      label="Received"
                      color={"green"}
                      fun={() => {
                        // dispatch(receiveOrder(item.id));
                        // Alert.alert("Received successfully.");
                        dispatch(
                          recOrderToSever({
                            token,
                            id: item.id,
                          })
                        );
                      }}
                    />
                  </View>
                  <View style={styles.line} />

                  <View>
                    <OrderList order={item.order_items} text={item.id} />
                  </View>
                </View>
              ) : null
            }
          />
        )}
      </View>
      <View
        style={(styles.item, { backgroundColor: "green", borderRadius: 15 })}
      >
        <Pressable
          onPress={() => {
            setIstogglecom(!togglecom);
            setIstogglepay(true);
            setIstogglerec(true);
          }}
        >
          <Text style={styles.titleText}>Completed Orders</Text>
        </Pressable>
        {!togglecom && (
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={keyExtractor}
            renderItem={({ item }) =>
              item.is_delivered == 1 ? (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View>
                      <View>
                        <Text style={styles.title}>
                          order number: {item.id}
                        </Text>
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
                    <OrderList order={item.order_items} text={item.id} />
                  </View>
                </View>
              ) : null
            }
          />
        )}
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
  list: { height: "82%" },
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
