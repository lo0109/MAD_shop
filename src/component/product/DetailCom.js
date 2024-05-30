import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/catSlice";
import { setSelectedProduct } from "../../redux/productSlice";
import { ImageButton } from "../imageButton";
import {
  addItemToCart,
  cartItems,
  increaseQuantity,
} from "../../redux/cartSlice";
export const ProdDetailCom = ({ navigation }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  const cartItem = useSelector(cartItems);
  const { id, image, title, price, description, category, rating } = product;
  const [loading, setloading] = useState(true);
  const itemInCart = cartItem.find((item) => item.id === id);
  const qty = itemInCart ? itemInCart.qty : null;
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.navigateTextBox}>
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate("Product");
              dispatch(setSelectedCategory());
            }}
          />
          <Text>/</Text>
          <Button
            title={category}
            onPress={() => {
              navigation.navigate("Category");
              dispatch(setSelectedCategory(category));
            }}
          />
        </View>
        <View style={styles.navigateTextBox}>
          <Text>/ </Text>
          <Text style={styles.navigateText} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.detail}>
        {loading && <ActivityIndicator size="large" color="grey" />}
        <View>
          <Image
            source={{ uri: image }}
            style={styles.image}
            onLoadStart={() => setloading(true)}
            onLoad={() => setloading(false)}
          />
        </View>

        <View>
          <Text style={styles.title}>{title} </Text>
        </View>
        <View style={styles.priceBox}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.price]}>Price: ${price}</Text>
            <View>
              <Text>Sold: {rating.count}</Text>
              <Text>Rating: {rating.rate}</Text>
            </View>
          </View>
          <View>
            {itemInCart ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "blue",
                      fontSize: 20,
                    }}
                  >
                    {qty}
                  </Text>
                  <Text>in Cart</Text>
                </View>

                <ImageButton
                  icon="cart-outline"
                  fun={() => {
                    dispatch(increaseQuantity({ id }));
                  }}
                />
              </View>
            ) : (
              <ImageButton
                icon="cart-outline"
                fun={() => {
                  dispatch(
                    addItemToCart({
                      id,
                      title,
                      price,
                      image,
                      qty: qty ? qty + 1 : 1,
                    })
                  );
                  navigation.navigate("Cart");
                }}
              />
            )}
          </View>
        </View>
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: 20,
          padding: 10,
          fontWeight: "bold",
        }}
      >
        Description:
      </Text>
      <ScrollView style={styles.descriptionBox}>
        <View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  descriptionBox: {
    padding: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    // backgroundColor: "yellow",
    flexDirection: "column",
    padding: 10,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
    paddingRight: 10,
  },
  detail: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
  },
  navigation: {
    flexDirection: "row",
  },
  navigateTextBox: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  navigateText: {
    fontSize: 15,
    // width: "100%",
  },
  home: {},
});

// console.log("ProdDetailCom", route.params.prod);
// const [animatedValue] = useState(new Animated.Value(0));
// const [textWidth, setTextWidth] = useState(0);
// const [containerWidth, setContainerWidth] = useState(280);

// useEffect(() => {
//   generateHorizontalScrollAnimation();
// }, [containerWidth, textWidth]);
// const generateHorizontalScrollAnimation = () => {
//   const scrollDistance = textWidth - containerWidth;
//   if (scrollDistance > 0) {
//     Animated.loop(
//       Animated.timing(animatedValue, {
//         toValue: -scrollDistance,
//         duration: 5000,
//         useNativeDriver: true,
//         easing: Easing.linear,
//       })
//     ).start();
//   }
// };

{
  /* <Animated.Text
            style={[
              styles.navigateText,
              {
                transform: [
                  {
                    translateX: animatedValue,
                  },
                ],
              },
            ]}
            onLayout={(event) => {
              setTextWidth(300);
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Animated.Text> */
}
