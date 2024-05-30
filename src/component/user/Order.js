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
import { orderRecord } from "../../redux/orderSlice";

export const OrderRecord = ({ navigation }) => {
  const isFocus = useIsFocused();
  const uID = useSelector(userID);
  const token = useSelector(authToken);
  const [togglepay, setIstogglepay] = useState(true);
  const [togglerec, setIstogglerec] = useState(true);
  const [togglecom, setIstogglecom] = useState(true);
  console.log(token);
  const dispatch = useDispatch();
  const orders = useSelector(orderRecord);
  useEffect(() => {
    if (isFocus && !uID) {
      Alert.alert("Please login to see the Order.");
      navigation.goBack();
    }
  }, [isFocus]);
  const payOrder = ({ id }) => {
    dispatch();
  };
  return (
    <View>
      <Text style={styles.title}>Your Order Record</Text>
      <View
        style={(styles.item, { backgroundColor: "orange", borderRadius: 15 })}
      >
        <Pressable onPress={() => setIstogglepay(!togglepay)}>
          <Text style={styles.titleText}>Pending payment</Text>
        </Pressable>
        {togglepay ? null : (
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              item.is_paid == 0 ? (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View>
                      <View>
                        <Text style={styles.title}>
                          order number: {item.id}{" "}
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
                    <ImageButton
                      icon={"card-outline"}
                      label="Check Out"
                      color={"green"}
                    />
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
        <Pressable onPress={() => setIstogglerec(!togglerec)}>
          <Text style={styles.titleText}>Pending received</Text>
        </Pressable>
        {togglerec ? null : (
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              item.is_paid == 1 ? (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View>
                      <View>
                        <Text style={styles.title}>
                          order number: {item.id}{" "}
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
                    <ImageButton
                      icon={"checkbox-outline"}
                      label="Check Out"
                      color={"green"}
                    />
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
        <Pressable onPress={() => setIstogglecom(!togglecom)}>
          <Text style={styles.titleText}>Completed Orders</Text>
        </Pressable>
        {togglecom ? null : (
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              item.is_delivered == 1 ? (
                <View style={styles.item}>
                  <View style={styles.product}>
                    <View>
                      <View>
                        <Text style={styles.title}>
                          order number: {item.id}{" "}
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
